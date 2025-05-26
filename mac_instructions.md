# تعليمات تشغيل مشروع Yuno على جهاز MacBook

## المقدمة

مشروع Yuno هو منصة لحجز العقارات مشابهة لـ Booking.com، ويتكون من جزأين رئيسيين:
1. **السيرفر (Server)**: مبني باستخدام Node.js وExpress وMongoDB
2. **العميل (Client)**: مبني باستخدام React وVite وTailwind CSS

هذا الدليل مخصص لتشغيل المشروع على جهاز MacBook Pro بنظام تشغيل macOS.

## متطلبات النظام

- Node.js (الإصدار 14 أو أحدث)
- npm (مدير حزم Node.js)
- Terminal (تطبيق الطرفية المدمج في macOS)
- متصفح ويب حديث (Safari، Chrome، أو Firefox)

## خطوات التثبيت والتشغيل

### الخطوة 1: استخراج الملفات

1. قم بفك ضغط الملف المرفق `yuno_fixed_final_without_node_modules.zip` في مجلد على جهازك
2. افتح تطبيق Terminal من مجلد Applications > Utilities أو باستخدام Spotlight (⌘ + Space)

### الخطوة 2: تشغيل السيرفر

1. انتقل إلى مجلد السيرفر في Terminal:
   ```bash
   cd /المسار/إلى/المجلد/المستخرج/server
   ```
   مثال: `cd ~/Downloads/yuno_fixed_final_without_node_modules/server`

2. قم بتثبيت التبعيات:
   ```bash
   npm install
   ```

3. قم بتثبيت mongodb-memory-server (ضروري للعمل بدون قاعدة بيانات محلية):
   ```bash
   npm install mongodb-memory-server --save-dev
   ```

4. تأكد من أن المنفذ 3000 غير مستخدم:
   ```bash
   # للتحقق من العمليات التي تستخدم المنفذ 3000
   lsof -i :3000
   
   # إذا وجدت عمليات، قم بإنهائها (استبدل PID برقم العملية)
   kill -9 PID
   ```

5. قم بتشغيل السيرفر:
   ```bash
   npm run dev
   ```

6. يجب أن ترى رسالة تؤكد أن السيرفر يعمل:
   ```
   Server running in development mode on port 3000
   ```

7. **ملاحظة مهمة**: إذا ظهرت رسالة خطأ `EADDRINUSE`، فهذا يعني أن المنفذ 3000 مشغول بالفعل. يمكنك:
   - إنهاء العملية التي تستخدم المنفذ كما في الخطوة 4
   - أو تغيير المنفذ في ملف `.env` إلى منفذ آخر (مثل 4000 أو 8000)

### الخطوة 3: تشغيل العميل

1. افتح نافذة Terminal جديدة (⌘ + T) وانتقل إلى مجلد العميل:
   ```bash
   cd /المسار/إلى/المجلد/المستخرج/client
   ```
   مثال: `cd ~/Downloads/yuno_fixed_final_without_node_modules/client`

2. قم بتثبيت التبعيات (مع حل مشاكل التوافق):
   ```bash
   npm install --legacy-peer-deps
   ```

3. قم بتثبيت مكتبة react-router-dom الضرورية للتنقل بين الصفحات:
   ```bash
   npm install react-router-dom --legacy-peer-deps
   ```

4. تأكد من وجود الملفات التالية في مجلد العميل:
   - `tsconfig.app.json`: ملف إعدادات TypeScript الإضافي
   - `tsconfig.node.json`: ملف إعدادات TypeScript للـ Node
   - `vite.config.js`: ملف إعدادات Vite

   إذا لم تكن موجودة، قم بإنشائها:

   **tsconfig.app.json**:
   ```bash
   echo '{
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "outDir": "./dist",
       "types": ["node"]
     },
     "include": ["src/**/*.ts", "src/**/*.tsx"]
   }' > tsconfig.app.json
   ```

   **tsconfig.node.json**:
   ```bash
   echo '{
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "composite": true,
       "skipLibCheck": true,
       "module": "ESNext",
       "moduleResolution": "bundler",
       "allowSyntheticDefaultImports": true
     },
     "include": ["vite.config.js"]
   }' > tsconfig.node.json
   ```

   **vite.config.js**:
   ```bash
   echo 'import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         "/api": {
           target: "http://localhost:3000",
           changeOrigin: true,
         }
       }
     }
   });' > vite.config.js
   ```

4. قم بتشغيل العميل:
   ```bash
   npm run dev
   ```

5. ستظهر رسالة تحدد عنوان الصفحة المحلية، عادة:
   ```
   ➜  Local:   http://localhost:5173/
   ```
   
   **ملاحظة**: إذا كان المنفذ 5173 مشغولاً، سيختار Vite تلقائياً منفذاً آخر (مثل 5174). استخدم العنوان الذي يظهر في الطرفية.

6. **مهم جداً**: تأكد من أن عنوان API في vite.config.js يتطابق مع منفذ السيرفر. إذا غيرت منفذ السيرفر في الخطوة 2، يجب تعديل ملف vite.config.js ليعكس هذا التغيير.

### الخطوة 4: فتح المشروع في المتصفح

1. افتح المتصفح (Safari أو Chrome أو Firefox)
2. انتقل إلى العنوان الذي ظهر في الخطوة 3.5 (عادة http://localhost:5173)
3. يجب أن ترى الصفحة الرئيسية لمشروع Yuno

## حل المشاكل الشائعة على MacBook

### مشاكل تعارض المنافذ

1. **المنفذ 3000 أو 5173 مشغول**:
   - استخدم الأمر `lsof -i :PORT` لمعرفة العملية التي تستخدم المنفذ
   - استخدم `kill -9 PID` لإنهاء العملية
   - أو غيّر المنفذ في ملفات الإعدادات

2. **عدم ظهور الأمر lsof**:
   - قم بتثبيت أدوات سطر الأوامر لـ Xcode:
     ```bash
     xcode-select --install
     ```

### مشاكل قاعدة البيانات

1. **عدم الاتصال بقاعدة البيانات**:
   - المشروع مهيأ لاستخدام قاعدة بيانات في الذاكرة تلقائياً
   - تأكد من تثبيت mongodb-memory-server كما في الخطوة 2.3

### مشاكل تثبيت التبعيات

1. **أخطاء في تثبيت تبعيات العميل**:
   - استخدم دائماً `npm install --legacy-peer-deps`
   - إذا استمرت المشكلة، جرب `npm install --force`

2. **أخطاء في تبعيات Node.js**:
   - تأكد من تثبيت Node.js بإصدار 14 أو أحدث:
     ```bash
     node -v
     ```
   - إذا كنت بحاجة لتثبيت Node.js، استخدم Homebrew:
     ```bash
     brew install node
     ```

### مشاكل في الواجهة

1. **عدم ظهور الصفحة بشكل صحيح**:
   - تأكد من أن السيرفر يعمل في الخلفية
   - تأكد من أن عنوان API في vite.config.js يتطابق مع منفذ السيرفر
   - افتح أدوات المطور في المتصفح (⌘ + Option + I) للتحقق من وجود أخطاء

## ملاحظات إضافية

- يمكنك استخدام Visual Studio Code لفتح وتحرير ملفات المشروع
- للتوقف عن تشغيل السيرفر أو العميل، اضغط Ctrl + C في نافذة Terminal المعنية
- تأكد من تشغيل السيرفر قبل تشغيل العميل للحصول على تجربة كاملة
- إذا واجهت أي مشاكل أخرى، يرجى التواصل للحصول على المساعدة
