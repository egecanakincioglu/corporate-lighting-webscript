# corporate-lighting-webscript

## 📋 Proje Hakkında

Afra Lighting’in kurumsal web platformu, şirketin aydınlatma çözümlerini tanıtmak, hizmetlerini yönetmek ve müşteri etkileşimini artırmak amacıyla geliştirilmiştir. Bu platform, kullanıcı dostu bir yönetim paneli ve modern bir ön yüz tasarımıyla hem kurumsal hem de bireysel müşterilere hitap eden kapsamlı bir çözüm sunmaktadır.

## 🚀 Özellikler
	1.	Kurumsal Ayarlar Yönetimi:
	  •	Şirket adı, logosu ve sosyal medya bağlantılarının güncellenmesi.
	  •	İletişim bilgileri ve şirket açıklamalarının kolayca düzenlenmesi.
	2.	Hizmet Yönetimi:
	  •	Sunulan hizmetlerin dinamik olarak eklenmesi ve düzenlenmesi.
	  •	Hizmetlerin görsel ve metinsel içerik yönetimi.
	3.	Banner ve Reklam Alanları:
	  •	Dış müşterilere yönelik reklam banner’larının yönetimi.
	  •	Dinamik görsel içerik düzenleme.
	4.	Ürün ve Katalog Yönetimi:
	  •	Aydınlatma ürünlerinin detaylarının sergilenmesi.
	  •	PDF kataloglarının yüklenmesi ve yönetilmesi.
	5. Vizyon ve Misyon Yönetimi:
	  •	Şirket vizyonu ve misyonunun içerik güncellemeleri.
	6. Entegrasyonlar:
	  •	Google Ads entegrasyonu ile reklam verilerinin gösterimi.
	  •	Kullanıcı etkileşimlerinin ve ziyaretçi istatistiklerinin takibi.

## 📂 Dosya Yapısı

### Projenin dosya yapısı aşağıdaki gibi organize edilmiştir:
	•	public/:
	•	Statik dosyalar (görseller, PDF’ler, favicon, vb.).
	•	src/components/:
	•	Ön yüz tasarımı için tekrar kullanılabilir bileşenler.
	•	src/pages/:
	•	Sayfa yapısı ve route tanımları (örneğin, index.tsx, contact.tsx).
	•	src/modules/:
	•	Yetkilendirme, veritabanı ve API çağrıları için yardımcı modüller.
	•	src/styles/:
	•	SCSS tabanlı modüler stiller.
	•	prisma/:
	•	Veritabanı şeması ve yapılandırma dosyaları.

## 🔧 Kullanılan Teknolojiler
	1.	Frontend: React.js (Next.js framework’ü ile birlikte).
	2.	Stil: TailwindCSS ve SCSS.
	3.	Backend: Node.js, Prisma ORM ile MySQL entegrasyonu.
	4.	Veritabanı: MySQL.
	5.	Diğer:
	•	JWT: Kullanıcı oturum yönetimi.
	•	Chart.js: İstatistiksel grafikler.
	•	PDF.js: PDF görüntüleme.
	•	GeoIP Lite: Ziyaretçi coğrafi analizleri.
	•	Framer Motion: Animasyonlar ve geçiş efektleri.

## 📖 Kurulum ve Çalıştırma

### Proje, aşağıdaki adımlarla çalıştırılabilir:

1.	Depoyu Klonlayın:
  
  ```
  git clone https://github.com/egecanakincioglu/corporate-lighting-webscript.git
  cd afra-lighting
  ```

2.	Bağımlılıkları Yükleyin:
	
  ```
  npm install
  ```

3.	Çevresel Değişkenleri Ayarlayın:
 
  •	.env dosyasını oluşturun ve aşağıdaki gibi doldurun:
    ```
    JWT_PRIVATE_KEY=
    JWT_EXPIRATION_TIME=3600 # Seconds
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    NODE_ENV=production
    EMAIL_SMTP=
    EMAIL_PORT=
    EMAIL_USER=
    EMAIL_PASS=
    ```

4.	Veritabanını Kurun:

  ```
  npx prisma migrate dev
  ```

5.	Proje Build ve Çalıştırma:
	•	Geliştirme Modu:

  ```
  npm run dev
  ```

•Üretim Modu:
  
  ```
  npm run build
  npm start
  ```

🛠️ Yönetim Paneli Özellikleri
	•	Kullanıcı Yönetimi: Admin yetkilendirme ve kullanıcı bilgilerinin düzenlenmesi.
	•	Site Ayarları:
	•	Banner, misyon, vizyon gibi içeriklerin dinamik olarak güncellenmesi.
	•	Reklam Yönetimi: Google Ads verilerinin gösterimi ve yönetimi.

🗂️ Önemli Dosyalar

  Dosya/Dizin	Açıklama
  src/pages/index.tsx	Ana sayfa
  src/pages/contact.tsx	İletişim sayfası
  src/components/	Ön yüz bileşenleri
  prisma/schema.prisma	Veritabanı şeması
  src/lib/	API çağrıları ve yardımcı işlevler
  public/	Statik dosyalar
