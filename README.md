<div align="center">

<img src="./icon.png" alt="Ramazan Toz Barber Studio Logo" width="180" style="border-radius: 18px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); margin-bottom: 16px;" />

# 💈 Ramazan Toz — Akıllı Berber Randevu ve Kasa Yönetimi PWA

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)](./LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Local_Vendor-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zero Backend](https://img.shields.io/badge/Storage-IndexedDB_Single_Source-8b5cf6?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
[![Offline First](https://img.shields.io/badge/Offline_First-SW_v6.1.0-emerald?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

<p align="center">
  <strong>Mobil öncelikli, çok turlu konuşma bağlamlı Türkçe sesli asistanlı, mola ve kapalı gün korumalı, no-show yönetimli, veresiye ayrıştırmalı Gün Sonu Kasa Raporlu, IndexedDB aynalı modern berber PWA uygulaması.</strong>
</p>

<p align="center"><a href="https://berbe-randevu2.vercel.app"><strong>Live Demo: https://berbe-randevu2.vercel.app</strong></a></p>

</div>

---

## 🌟 Kapsamlı Özellik Seti

### 1. ⏱️ Hizmete Göre Otomatik Süre & Esnek Çizelge
- **Hizmet Süresi Hesaplama:** Saç kesimi (30 dk), Saç-Sakal (45 dk), Sakal (20 dk), Çocuk tıraşı (20 dk), Saç yıkama (15 dk) gibi süreler ayarlardan belirlenir.
- **5-15 Dakikalık Dinamik Çizelge:** Katı 30 dakikalık bloklar yerine işlem süresine göre ölçeklenen randevu kartları ve aralardaki gerçek boşluklar.
- **Erken Bitirme & Geçerli Zaman Penceresi:** Berber işlemi erken tamamladığında gerçek bitiş saati kaydedilir, kalan süre serbest bırakılır. Geçmişte kalmış dakikalar elenir; sadece *o anki saatten (`nowTime`)* itibaren kullanılabilir olan aralık bekleme listesine veya plansız müşteriye önerilir.
- **Plansız Müşteri (Walk-in):** Bir sonraki randevuya kadar olan süreye tam sığabilecek hizmetleri göstererek tek dokunuşla kaydeder.
- **Süre Öğrenme (AI Tavsiye):** Son tamamlanan işlemleri analiz ederek varsayılan süreleri optimize etmeyi önerir (berber onaylamadan otomatik değiştirmez).

### 2. 🍴 Mola ve Kapalı Gün Yönetimi (Çakışma Korumalı)
- **Haftalık Kapalı Gün:** Ayarlardan salonun kapalı olduğu gün seçilir (varsayılan: Pazar kapalı). Kapalı günlerde takvimde özel dinlenme kartı gösterilir; ne manuel ne de sesli asistanla kapalı güne randevu yazılamaz.
- **Öğle / Yemek Molası (13:00 - 14:00):** Belirlenen dinlenme saatleri `ConflictEngine` tarafından korunur. Mola saatlerine denk gelen randevu girişimleri sistem tarafından engellenir ve berbere bildirilir.

### 3. 📋 Bekleme Listesi (Waitlist) & Yaşam Döngüsü & Çift Randevu Güvencesi
- **Genişletilmiş Otomatik Tarama:** Bekleme listesi şu 5 durumda otomatik devreye girer:
  1. Randevu iptal edildiğinde veya silindiğinde.
  2. Bir randevu başka bir güne/saate taşındığında (eski boşalan saat için).
  3. Koltuktaki müşteri erken bitirildiğinde (kalan geçerli süre için).
  4. Bir randevunun süresi kısaltıldığında.
  5. Berber mesai saatlerini genişlettiğinde.
- **Statü Yaşam Döngüsü & WhatsApp Teyidi:** `Bekliyor`, `Teklif Gönderildi`, `Onay Bekleniyor`, `Kabul Edildi`, `Vazgeçti`. WhatsApp sohbeti açıldığında otomatik teklif sayılmaz; berber *"Mesajı Gönderdim"* teyidini verir ve 30 dakikalık teklif geçerlilik süresi başlar.
- **Kesin Çift Randevu Engelleme:** WhatsApp üzerinden teklif gönderilmesi saati rezerve etmez. Müşteri kabul ettiğinde çakışma motoru anlık olarak yeniden taranır; eğer o saat başka bir randevuyla dolmuşsa sistem asla çift randevu oluşturmaz, berberi uyarır.

### 4. 🌙 Gün Sonu Kasa Raporu (Nakit Yönetimi, Kasa Farkı & Veresiye Ayrıştırması)
- **Resmî Mali Z-Raporuyla Karışmayan İsimlendirme:** "Gün Sonu Kasa Raporu".
- **Randevu Durumu ile Ödeme Durumunun Bağımsız Olması:**
  - Bir randevu *Tamamlandı* durumundayken ödemesi **"Tam Ödendi"**, **"Kısmi Ödeme"** veya **"Veresiye / Sonra Ödenecek"** olabilir.
  - Kasa raporu SADECE fiilen tahsil edilen tutarı kasaya yazar; veresiye tutarlar kasada hayali para oluşturmaz, raporda **"Bekleyen Veresiye / Alacak"** olarak ayrı dökülür.
- **Gelişmiş Nakit Akışı & Kasa Farkı Formülü:**
  - **Hizmet Cirosu:** Tamamlanan hizmetlerin toplam satış değeri.
  - **Toplam Tahsilat:** Fiilen kasaya giren Nakit + Kart + Havale.
  - **Açılış Nakdi (Kasa Devri):** Güne başlarken çekmecede bulunan nakit.
  - **Kasaya Eklenen:** Gün içinde bozuk para için kasaya konan para.
  - **Kasadan Çekilen:** Patron çekimi veya bankaya yatırılan para.
  - **Nakit Giderler:** Dükkan için nakit ödenen harcamalar.
  - **Beklenen Kasa Nakdi:** `Açılış + Nakit Tahsilat - Nakit Gider - Kasadan Çekilen + Kasaya Eklenen`.
  - **Sayılan Gerçek Nakit:** Berberin gün sonunda çekmecede fiziki sayıp girdiği tutar.
  - **Kasa Farkı:** Sistem anında **Kasa Açığı**, **Kasa Fazlası** veya **Tam Dengede** olduğunu gösterir.
  - **Günlük Faaliyet Sonucu:** `Hizmet Cirosu - Günlük Giderler` (Kira, vergi gibi dönemsel masraflar hariçtir).
- **Arşivleme & Düzeltme Kaydı (Audit Trail):** Kapatılan günlerde sonradan düzeltme yapıldığında, orijinal ilk kapanış tutarı ve sonradan yapılan düzeltmeler şeffafça yan yana listelenir.

### 5. ⚠️ Tek Berber Kuralı & Gecikme / No-Show Yönetimi
- **Gecikme Uyarısı (Delay Overrun Bar):** Mevcut işlem planlanandan uzun sürdüğünde ve sonraki randevuya 15 dk veya daha az kaldığında uyarı çubuğu açılır:
  - **"İşlemi Bitir"**: Koltuktaki aktif müşteriyi tamamlar.
  - **"Gecikme Yaz (WhatsApp)"**: Sonraki müşteriye hazır nazik gecikme mesajını açar.
  - **"+15 Dk Kaydır"**: Güvenli çakışma kontrolüyle randevuyu 15 dk ileri alır. Eğer 15 dk sonrası doluysa zincirleme kaydırma yapmaz; günün ilk uygun boş saatini tespit edip berbere alternatif sunar.
- **Gelmeyen (No-Show) Müşteri Yönetimi:** 15+ dk geciken randevularda tek dokunuşla **"Gelmeyen İşaretle (No-Show)"**; koltuk derhal serbest kalır, müşteri profiline no-show işlenir ve bekleme listesi taranır.

### 6. 👤 Müşteri Hafızası (Telefon Esaslı CRM & VIP Notları)
- **Telefon Numarasıyla Eşleştirme:** İki "Ahmet" gibi isim benzerliklerini önlemek için telefon numarası birincil anahtar kullanılır; telefon numarası olmayanlar "Geçici Profil" olarak işaretlenir.
- **Özelleştirilebilir VIP Kriteri:** Ayarlardan minimum ziyaret sayısı (varsayılan: 5) veya minimum harcama (varsayılan: 2.000 ₺) belirlenebilir; istenen müşteriye kartından tek tıkla **"Özel VIP"** atanabilir.
- **Özel Berber Notu:** Müşteriye özel kalıcı notlar (örn: *"Yanlar 3 numara, üstler makas, çayı açık"*).

### 7. 💾 Kalıcı Veri Güvenliği: IndexedDB Tek Kaynak (Single Source of Truth) & Harici JSON Yedek
- **IndexedDB Tek Gerçek Veri Kaynağı (`BarberFlow_DB`):**
  - Tüm iş verileri (`appointments`, `settings`, `waitlist`, `expenses`, `dailyClosures`, `cashLedger`, `auditLog`, `customerNotes`) doğrudan tarayıcının yerel **IndexedDB** veritabanında asenkron ve işlemsel (transactional) olarak yönetilir.
  - **Çift Yazma (Dual-Write Divergence) Riski Ortadan Kaldırıldı:** Eski LocalStorage ikili kopyalama yaklaşımı tamamen kaldırılarak veri tutarsızlığı önlendi. LocalStorage sadece küçük arayüz tercihleri (`barberflow_ui_prefs_v1` - tema, aktif sekme) için kullanılır.
  - **İşlemsel Yazma ve Atomik Taahhüt (Write-Through Transaction with Rollback):** Önce IndexedDB transaction'ı açılır. Yalnızca veritabanı yazımı başarıyla taahhüt edildiğinde (`tx.oncomplete`) RAM önbelleği güncellenir ve kullanıcıya başarı bildirilir. Transaction hata verirse (`tx.onerror`) RAM önbelleğine dokunulmaz (otomatik rollback), form kapatılmaz ve kullanıcı uyarılır.
  - **Sıfır Gecikmeli Okuma (0ms RAM Cache):** Arayüzün akıcı çalışması için başlatma anında IndexedDB verileri bellek içine alınır, sorgular bellekten 0ms senkron gecikmeyle döner.
- **Harici JSON Yedek İndirme (Dış Felaket Kurtarma Kalkanı):**
  - Tarayıcının "Site Verilerini Temizle" seçeneği hem LocalStorage hem de IndexedDB'yi silebileceğinden, **gerçek ve bağımsız tek felaket koruması harici JSON yedeklemesidir**.
  - Tek tıkla `barberflow_backup_YYYY-MM-DD_HHmm.json` dosyasını cihazın dosya sistemine veya bulut klasörüne indirir.
- **Doğrulamalı Geri Yükleme:** Yedek dosyası yüklendiğinde içerisindeki randevu, müşteri ve kasa raporu sayılarını berbere özetleyip teyit alarak IndexedDB'ye yazar.
- **7 Günlük Dış Yedekleme Uyarısı:** 7 gündür dışarıya JSON yedeği alınmadıysa ayarlarda ve menüde hatırlatma rozeti gösterilerek işletme güvenliği sağlanır.

### 8. 📶 Tam Çevrimdışı (Offline-First) Mimari & Sürümlü Service Worker (`sw.js` v6.1.0)
- **Yerel Paketlenen Kütüphaneler (Sıfır CDN Bağımlılığı):**
  - **Tailwind CSS (`./vendor/tailwind.min.js`):** İnternet bağlantısı olmasa bile tasarımın bozulmaması için yerel olarak depolanır ve Service Worker tarafından önbelleğe alınır.
  - **Lucide İkonları (`./vendor/lucide.min.js`):** 54 farklı arayüz ikonu tamamen yerel kütüphaneden render edilir.
  - **CDN Fallback Güvencesi:** Yerel dosyaların erişilememesi durumuna karşı otomatik CDN yükleme desteği mevcuttur.
- **Akıllı Ağ ve Önbellek Stratejisi (Cache Strategies):**
  - **Navigasyon (HTML):** *Network-First* stratejisi ile çevrimiçi iken güncellemeleri anında çeker; internet olmadığında önbellekteki `index.html` dosyasını sıfır hatayla açar.
  - **Statik Varlıklar (`vendor/`, ikonlar, manifest):** *Cache-First* stratejisi ile 0ms yerel hızda yüklenir.
- **Güncelleme Sırasında Sıfır Veri Kaybı Garantisi:**
  - Service Worker sürüm yükseltmelerinde (`v6.1.0`) yalnızca Cache Storage temizlenir.
  - İşletmenin can damarı olan randevular, kasa kayıtları, müşteri notları ve ayarlar **IndexedDB (`BarberFlow_DB`)** içinde saklandığı için hiçbir Service Worker güncellemesinde **asla silinmez veya etkilenmez**.

### 9. 🎙️ Çok Turlu Konuşma Bağlamlı Türkçe Sesli Asistan & Bağlantı Bilgilendirmesi
- Asistan kısa süreli konuşma akışını hafızasında tutarak diyalog kurar:
  - **Berber:** *"Yarın Ahmet'e saat üçte saç sakal yaz."*
  - **Asistan:** *"Yarın saat 15:00 uygun. Randevuyu oluşturayım mı?"* (Bağlam açılır).
  - **Berber:** *"Yok, dört olsun."* (veya *"Saat 16:00 yap"*, *"Dörde al"*)
  - **Asistan:** Saat düzeltmesini anlar, çakışmayı kontrol eder: *"Saat 16:00 uygun. Ahmet için saç-sakal randevusunu onaylıyor musunuz?"*
  - **Berber:** *"Evet"* / *"Onaylıyorum"* -> Randevu oluşturulur ve teyit edilir!
- **🌐 Ses Tanıma ve İnternet / Çevrimdışı Gereksinim Şeffaflığı:**
  - Web Speech API (`SpeechRecognition`), tarayıcı ve işletim sistemi sağlayıcılarına (Google Speech Services, Apple Siri/Dictation) bağlıdır.
  - Modern birçok akıllı telefonda Türkçe dil modelleri henüz cihaz içinde gömülü olmadığından, **ses tanıma aktif internet bağlantısı veya cihazda indirilmiş Türkçe çevrimdışı ses paketi** gerektirebilir.
  - Cihaz çevrimdışıyken ses tanıma ağ hatası verirse, sistem arayüzde nazik bir bilgilendirme rozeti gösterir ve berberi tek dokunuşla **Manuel Randevu Formu**'na yönlendirir. Hiçbir işlem yarıda kalmaz.

---

## 🚀 Hızlı Başlangıç

### Node.js ile Çalıştırma
```bash
npm start
```
Tarayıcınızda `http://localhost:3000` adresini açın.

### Doğrudan Tarayıcıda Açma
Herhangi bir web sunucusu kurmadan `index.html` dosyasını çift tıklayarak modern bir tarayıcıda çalıştırabilirsiniz.

---

## 📱 PWA Olarak Telefona Yükleme

1. **iOS (Safari):** Siteyi Safari'de açın > Paylaş simgesine dokunun > **"Ana Ekrana Ekle"**.
2. **Android (Chrome):** Siteyi Chrome'da açın > Üç nokta menüsü > **"Uygulamayı Yükle"**.

---

## 🛠️ Teknolojiler

- **HTML5 & Vanilla JavaScript (ES6+):** Sıfır harici kütüphane bağımlılığı, saf ve yüksek performanslı kod tabanı.
- **IndexedDB (Single Source of Truth) & UI LocalStorage:** İş mantığı ve finansal veriler için tam asenkron IndexedDB veritabanı; arayüz tercihleri için hafif LocalStorage ayrıştırması.
- **Yerel Paketlenmiş Tailwind CSS & Lucide Icons:** CDN kesintilerine ve çevrimdışı kullanıma karşı `./vendor/` altında yerel olarak paketlenmiş ve önbelleklenmiş kütüphaneler.
- **Web Speech API & Çevrimdışı Güvenliği:** Tarayıcı tabanlı ses tanıma, Türkçe konuşma sentezi ve çevrimdışı fallback bilgilendirmesi.
- **Sürümlü PWA Service Worker (`sw.js` v6.1.0):** Cache-First / Network-First stratejileri, otomatik önbellek güncellemesi ve veri kaybı koruması.

---

## 📄 Lisans

Bu proje [MIT Lisansı](./LICENSE) kapsamında lisanslanmıştır.
