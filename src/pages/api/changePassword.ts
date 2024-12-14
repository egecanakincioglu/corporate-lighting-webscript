import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { verifyUser } from "@/src/modules/database/events/verifyUser";
import { updateUser } from "@/src/modules/database/events/updateUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current password and new password are required" });
  }

  const sessionToken = req.cookies.sessionToken;
  const verifyResult = await verifyUser(sessionToken);

  const { status } = verifyResult;

  if (!status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { user } = verifyResult;

  const isPasswordValid = bcrypt.compareSync(
    currentPassword,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
  await updateUser(user.username, {
    passwordHash: hashedNewPassword,
    sessions: [],
  });

  return res.status(200).json({ message: "Password changed successfully" });
}
