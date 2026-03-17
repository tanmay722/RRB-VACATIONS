# Server Folder Architecture & Working ✨

Yeh folder RRB Vacations ki Backend (Server API) handle karta hai. Yeh Express.js aur Prisma ORM (Neon DB / PostgreSQL) par based hai.

## 📂 Folder Structure

- **`index.js`**: Main entry point. Yahi se server start hota hai (jaise port 5000 par) aur sabhi routes / middlewares connect hote hain.
- **`prisma/`**: Yahan database ki schema file (`schema.prisma`) hoti hai jo define karti hai tumhare tables (Admin, Package, etc.).
- **`routes/`**: Isme API endpoints ki files hain (jaise `packages.js`, `auth.js`) jahan backend ka logic (Create, Read, Update, Delete) likha hai.
- **`middleware/`**: Isme files hain jaise `auth.js` jo verify karti hain ki API request properly authenticated hai ya nahi (via JWT token). Isse koi bina login kiye admin endpoints directly hit nahi kar pata.
- **`uploads/`**: Jab admin panel se koi nayi image upload hoti hai (Main image ya Gallery image), wo properly locally yahan iss folder mein save hoti hai.
- **`.env`**: Database URL aur secret keys (JWT secret) yahan hoti hain (Kyunki ye confidential hain isliye gitignored rehti hain).

---

## 🛠 Samajhne Waale Sawal (Logical FAQs / Flow)

### 1. Neon DB (PostgreSQL) kaise connect kiya hai yahan?

Hum yahan **Prisma ORM** use kar rahe hain.
Connect karne ke liye `server/.env` file mein `DATABASE_URL` set kiya jata hai (Jo Neon DB dashboard se copy kiya jata hai, e.g. `postgresql://...`).
Prisma automatically us URL ko read karta hai (via `prisma/schema.prisma`) aur jaise hi query hoti hai, DB se smoothly connect ho jata hai.

### 2. Kya hoga agar maine `schema.prisma` mein naya column (jaise `tourPrice`) add kiya?

Agar aap sirf code (schema.prisma) mein change karte ho, toh Neon Database mein automatically apne aap tables update **nahi** hote.
Jab aap code mein schema badalte hain, aapko terminal mein (server folder ke andar) yeh command run karni padegi:

```bash
npx prisma db push
```

Yeh command aapke Prisma schema ko database se match karti hai aur latest changes ko wahan Neon DB me **apply/push** kar deti hai. Iske turant baad `npx prisma generate` chalta hai jisse aapke code mein Prisma functions latest update pe sync ho jate hain.

### 3. Kya hoga agar maine manually directly Neon DB me jaake column ya table add kiya?

Agar aapne directly Neon DB website par table banayi, toh tumhare backend code (Prisma) ko uske baare mein nahi malum hoga aur agar aap data fetch karne ki koshish karoge to error aayega.
Aisi situation mein, Data Model ko code mein laane ke liye ye command chalti hai:

```bash
npx prisma db pull
```

Ye command Database se schema read karke aapke `.prisma` file ko automatically likh degi. Fir `npx prisma generate` run karna hoga client ko update karne ke liye. Tabhi Prisma Client directly data query kar payega aapki react app ke liye!

### 4. `uploads/` folder ko GitHub par push kyun nahi kar dete? Phir images kaise show hongi?

GitHub aapke "Source Code" store karne ke liye hota hai, "User Generated Files" ya "Images" store karne ke liye nahi.
Agar app ko Live deploy kiya jata hai (eg. AWS, Vercel, Render), to Admin din raat nayi nayi photos add karega. Agar hum uploads ko git mein lock kardete hain to lagatar repository size bhari hoti jayegi, commit issues aayenge, aur version control bigad jaega.
Isliye best practice hai ki **Uploads ko git ignore rakkho.**
Local mein jab aap run kar rahe hote ho, apne PC mein woh `uploads` mein images ko padh kar show kar dega bina koi dikkat ke unhe browser par bhejdega!
_Note:_ Production (Live App) mein, in image saves ko Amazon S3 ya Firebase/Cloudinary par bheja jata hai locally app par save karne ke bjaye. Jiske links actually Frontend pe dikhte hain.

### 5. `test-insert.js` aur `run-all.bat` jaise files the, wo kya the?

Woh testing files the jab is Project initially setup kiya ja raha tha (data fetch karna hai, testing karna connection chala ki nai, wagrah).
Ek real Production app mien core logic sirf routes/ controllers me exist karta hai. Random execution scripts waha rahne se repository unclean lagti hai aur unka actual deployment process me koi role nai hota isliye humne delete karke clean kar diya. Aap tab tak naye code easily branch out karke push kar sakte ho.
