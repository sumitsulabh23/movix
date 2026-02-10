const KEYS = {
    USERS: 'movie_booking_users',
    LOGGED_IN_USER: 'movie_booking_current_user',
    BOOKINGS: 'movie_booking_bookings',
    SELECTED_CITY: 'movie_booking_selected_city'
};

export const storage = {
    // User operations
    getUsers: () => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
    saveUser: (user) => {
        const users = storage.getUsers();
        users.push(user);
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    },

    // Session operations
    getLoggedInUser: () => JSON.parse(localStorage.getItem(KEYS.LOGGED_IN_USER)),
    setLoggedInUser: (user) => localStorage.setItem(KEYS.LOGGED_IN_USER, JSON.stringify(user)),
    logout: () => {
        localStorage.removeItem(KEYS.LOGGED_IN_USER);
        localStorage.removeItem(KEYS.SELECTED_CITY);
    },

    // City operations
    getSelectedCity: () => localStorage.getItem(KEYS.SELECTED_CITY),
    setSelectedCity: (city) => localStorage.setItem(KEYS.SELECTED_CITY, city),

    // Booking operations
    getBookings: () => JSON.parse(localStorage.getItem(KEYS.BOOKINGS) || '[]'),
    saveBooking: (booking) => {
        const bookings = storage.getBookings();
        bookings.push({ ...booking, id: Date.now() });
        localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
    }
};
