import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


// Demo users (in a real app, this would be in a database)
const users = [
    {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        // Plain text password for demo purposes only - in production, always use hashing
        password: "password123",
        image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    {
        id: "2",
        name: "Test User",
        email: "test@example.com",
        // Plain text password for demo purposes only
        password: "password123",
        image: "https://avatars.githubusercontent.com/u/2?v=4",
    },
]

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password")
                }

                const user = users.find((user) => user.email === credentials.email)

                if (!user) {
                    throw new Error("No user found with this email")
                }

                // Direct password comparison for demo purposes
                const passwordMatch = credentials.password === user.password

                if (!passwordMatch) {
                    throw new Error("Incorrect password")
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
      jwt: {
    secret: 'asfujhasofhoashfoasifhoiashfoasifhoasfash',
        },
    callbacks: {
        async session ({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            return session
        },
    },
})

export { handler as GET, handler as POST }
