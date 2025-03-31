This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Learnings - 

-> npx shadcn@latest add button to add shadcn ui components like installed button which gets automatically stored in ui folder in components



Q1 - why to use form in Navbar for signin and signout button?

Ans =  Using a `<form>` instead of `onClick` for `signIn` and `signOut` is a great alternative because **forms work in both Server and Client Components** without requiring client-side JavaScript. This approach ensures a smoother **hydration process** and avoids unnecessary client-side rendering.

---

## **🚀 Solution: Use `<form>` for Authentication**
Instead of `onClick={signIn}` and `onClick={signOut}`, you can use **server actions** (or Next.js API routes) to handle authentication.

### **🔹 Fix: Modify `Navbar` to Use Forms**
```tsx
import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navbar() {
    const session = await auth(); // Fetch session on the server

    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src='/logo.svg' alt='logo' width={100} height={50} />
                </Link>
                <div className='flex items-center gap-5 text-black'>
                    {session && session.user ? (
                        <> 
                            <Link href={'/startup/create'} className='text-gray-700'>
                                Create
                            </Link>
                            {/* Sign Out Form */}
                            <form action="/api/auth/signout" method="post">
                                <button type="submit" className='text-gray-700'>Sign Out</button>
                            </form>
                            <Link href={`/user/${session.user.id}`} className='text-gray-700'>
                                Profile
                            </Link>
                        </>
                    ) : (
                        // Sign In Form
                        <form action="/api/auth/signin/github" method="post">
                            <button type="submit" className='text-gray-700'>Sign In</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
}
```

---

## **✅ Why This Fix Works**
### **1️⃣ No More `onClick` (Pure HTML)**
- Since forms **use `action` and `method="post"`**, authentication happens **without client-side JavaScript**.
- Works inside **Server Components** because it **doesn’t require client-side event handlers**.

### **2️⃣ Works in Both SSR and Client Environments**
- No **hydration issues** because the form behaves as a normal HTML form, preventing mismatches between server and client.
- Works in **progressive enhancement** mode (JavaScript isn’t required for basic functionality).

### **3️⃣ Leverages Next.js API Routes (or Server Actions)**
- The form submits data to `/api/auth/signin/github` and `/api/auth/signout`, which you can handle with **NextAuth.js API routes**.

---

## **✨ Alternative: Use Server Actions (Next.js 14)**
If you're using **Next.js 14 with Server Actions**, you can define `signIn` and `signOut` as server actions and call them directly in the form:
```tsx
'use server';

import { signIn, signOut } from '@/auth';

export async function logout() {
    "use server";
    await signOut();
}

export async function login() {
    "use server";
    await signIn("github");
}
```
Then, update the form in `Navbar`:
```tsx
<form action={logout}>
    <button type="submit" className='text-gray-700'>Sign Out</button>
</form>

<form action={login}>
    <button type="submit" className='text-gray-700'>Sign In</button>
</form>
```

---

## **🎯 Final Thoughts**
Using **forms for authentication** is a **best practice** when working with Next.js **Server Components**, ensuring:
✅ **No hydration errors**  
✅ **Better performance (no unnecessary client-side JavaScript)**  
✅ **SEO & accessibility improvements**  
✅ **Works with Next.js API routes & Server Actions**  

Would you like help setting up an API route for authentication if you’re using NextAuth.js? 🚀


2. How 1.form with action with serverFunction, 2. form with (action with api route and method) and 3. form with onSubmit are different from each other?


Ans = ### **🚀 Difference Between `onSubmit` and `action` with `method` in Next.js Forms**  

In Next.js, there are **two main ways** to handle form submissions:  
1. **Using `onSubmit` (Client-Side JavaScript)**
2. **Using `action` with `method="POST"` (Native Form Submission)**  

---

## **1️⃣ `onSubmit` (Client-Side JavaScript)**
This approach **prevents the default form submission** and handles the request using JavaScript (`fetch()`, `useRouter()`, etc.).  

### **🔹 Example: Handling Form with `onSubmit` (Client-Side)**
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default page reload

    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/invoice', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/invoices'); // Client-side redirect
    } else {
      console.error('Submission failed');
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}> 
      <input name="customerId" placeholder="Customer ID" required />
      <input name="amount" type="number" placeholder="Amount" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Invoice'}
      </button>
    </form>
  );
}
```

### **🛠️ How This Works**
✅ Uses JavaScript (`fetch()`) to send data  
✅ Prevents **default form submission** (`event.preventDefault()`)  
✅ Allows **handling success/failure dynamically**  
✅ Enables **client-side validation & UI feedback**  
❌ **JavaScript required** (won't work if JS is disabled)  

---

## **2️⃣ `action` with `method="POST"` (Native Form Submission)**
This **submits the form directly to a server endpoint** without JavaScript. It uses **traditional HTML form submission**.  

### **🔹 Example: Using `action` and `method="POST"`**
```tsx
export default function Page() {
  return (
    <form action="/api/invoice" method="POST"> 
      <input name="customerId" placeholder="Customer ID" required />
      <input name="amount" type="number" placeholder="Amount" required />
      <button type="submit">Create Invoice</button>
    </form>
  );
}
```

### **🛠️ How This Works**
✅ No JavaScript needed  
✅ Works even if JavaScript is disabled  
✅ Simpler & more accessible  
❌ **Full page reloads** after submission  
❌ Harder to handle **errors & UI updates dynamically**  

---

## **3️⃣ Server Actions with `action={serverFunction}`**
Next.js 14+ introduced **Server Actions**, allowing you to pass a **server function** directly as the `action` attribute.  

### **🔹 Example: Using a Server Action**
```tsx
'use server';

export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server';

    console.log('Creating invoice:', formData.get('customerId'));
    redirect('/invoices'); // Server-side redirect
  }

  return <form action={createInvoice}> 
      <input name="customerId" placeholder="Customer ID" required />
      <button type="submit">Create</button>
    </form>;
}
```

### **🛠️ How This Works**
✅ Runs **entirely on the server**  
✅ **No need for API routes**  
✅ **No page reload**, works like JavaScript `fetch()`  
✅ Can use `redirect('/path')` directly  
❌ Only works in Next.js 14+  

---

## **🔥 Key Differences**
| Approach | Requires JavaScript? | Page Reload? | Handles Errors & UI Updates? | Supports Redirect? |
|----------|----------------|------------|-------------------|----------------|
| **onSubmit (Client-side JavaScript)** | ✅ Yes | ❌ No | ✅ Yes (via `useState`) | ✅ Yes (`useRouter().push()`) |
| **action with method="POST" (Native HTML Form Submission)** | ❌ No | ✅ Yes | ❌ No | ✅ Yes (`res.redirect()` in API) |
| **Server Actions (`action={serverFunction}`)** | ❌ No | ❌ No | ✅ Yes (on server) | ✅ Yes (`redirect('/path')`) |

---

## **🎯 When to Use Which Approach?**
✅ **Use `onSubmit` (Client-Side)** → When you need real-time feedback, validation, or client-side logic.  
✅ **Use `action` with `method="POST"`** → When you want simple, no-JavaScript, accessible forms.  
✅ **Use Server Actions (`action={serverFunction}`)** → When using Next.js 14+ for **direct server-side processing** without API routes.  

Let me know if you need a **specific example** based on your use case! 🚀