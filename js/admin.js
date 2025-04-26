// Admin Authentication
const ADMIN_EMAIL = 'seifelmasry2024@gmail.com'; // البريد الإلكتروني الوحيد المسموح به
const ADMIN_PASSWORD = 'admin123'; // This should be handled securely in a real application

// Login Page
if (document.getElementById('adminLoginForm')) {
    const loginForm = document.getElementById('adminLoginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('بيانات الدخول غير صحيحة');
        }
    });
}

// Dashboard Page
if (document.querySelector('.dashboard-body')) {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // Sample messages data (in a real application, this would come from a backend)
    const messages = [
        {
            name: 'seif eldeen helal',
            email: 'seifelmasry2024@gmail.com',
            message: 'رسالة تجريبية 1',
            date: '2025-04-26'
        },
        {
            name: 'Ahmed Mohamed',
            email: 'Ahmedmohamed20@gmail.com',
            message: 'رسالة تجريبية 2',
            date: '2025-04-25'
        },
        {
            name: 'Sara Ahmed',
            email: 'saraahmed50@gmail.com',
            message: ' رسالة تجريبية 3',
            date: '2025-04-25'
        },
        {
            name: 'nostafa Ahmed',
            email: 'mostafaahmed56@gmail.com',
            message: 'رسالة تجريبية 4',
            date: '2025-04-25'
        },
    ];
    
    // Populate messages
    const messagesList = document.querySelector('.messages-list');
    if (messagesList) {
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <h4>${msg.name}</h4>
                <p>${msg.email}</p>
                <p>${msg.message}</p>
                <small>${msg.date}</small>
            `;
            messagesList.appendChild(messageElement);
        });
    }
    
    // Handle menu clicks
    const menuItems = document.querySelectorAll('.admin-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}
