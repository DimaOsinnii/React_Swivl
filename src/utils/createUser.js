export default function createUser(user) {
    return Object.fromEntries(
        Object.entries(user)
            .filter(([key]) => ['name', 'followers', 'following', 'created_at', 'company', 'email', 'location', 'blog', 'bio', 'login', 'avatar_url'].includes(key))
    );
};


