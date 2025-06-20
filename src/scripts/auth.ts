const { signIn, signOut } = await import("auth-astro/client")
document.querySelectorAll(".login").forEach(x => x.onclick = () => signIn("google"))
document.querySelectorAll(".logout").forEach(x => x.onclick = () => signOut())