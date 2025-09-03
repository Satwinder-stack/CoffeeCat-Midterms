<?php
session_start();
$message = '';
$displayData = '';
$fields = [
    'firstName' => 'First Name',
    'lastName' => 'Last Name',
    'gender' => 'Gender',
    'address' => 'Address',
    'contact' => 'Contact Number',
    'email' => 'Email Address',
    'dob' => 'Date of Birth',
    'username' => 'Username',
    'password' => 'Password'
];
$defaultInfoHtml = '<h3>Submitted Information</h3><ul>';
foreach ($fields as $label) {
    $defaultInfoHtml .= '<li><strong>' . htmlspecialchars($label) . ':</strong> </li>';
}
$defaultInfoHtml .= '</ul>';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST)) {
    $data = [];
    foreach ($fields as $field => $label) {
        $data[$field] = isset($_POST[$field]) ? trim($_POST[$field]) : '';
    }
    $displayData = json_encode($data);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up | Coffee Cat Café</title>
    <link rel="stylesheet" href="css/signup.css">
</head>
<body>
    <header>
        <div class="logo">
            <a href="landing.html"><img src="images/logo.png" class="logo-img"></a>
            <a href="landing.html"><img src="images/logo name.png" class="logo-name"></a>
        </div>
        <img src="images/cats/pawprint.png" class="header-paw-print" id="paw" >
        <div class="social-links">
            <a href="index.html" class="nav-link">Home</a>
            <a href="features.html" class="nav-link">Features</a>
        </div>
    </header>
    <main>
        <section class="signup-section">
            <div class="container">
                <div class="form-box">
                    <form id="signupForm" method="POST" autocomplete="off" novalidate>
                        <h2>Customer Signup</h2>    
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required>
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required>
                        <label>Gender</label>
                        <div class="gender-group">
                            <label><input type="radio" name="gender" value="Male" required> Male</label>
                            <label><input type="radio" name="gender" value="Female"> Female</label>
                            <label><input type="radio" name="gender" value="Other"> Other</label>
                        </div>
                        <label for="address">Address</label>
                        <textarea id="address" name="address" required></textarea>
                        <label for="contact">Contact Number</label>
                        <input type="text" id="contact" name="contact" required pattern="\\d+" minlength="7" maxlength="15" inputmode="numeric">
                        <div class="error-message" id="contactError" style="color:#b94a48; font-size:0.97em; margin-bottom:0.7em; display:none;"></div>
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                        <label for="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" required>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required minlength="6">
                        <div class="error-message" id="usernameError" style="color:#b94a48; font-size:0.97em; margin-bottom:0.7em; display:none;"></div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required minlength="6">
                        <div class="error-message" id="passwordError" style="color:#b94a48; font-size:0.97em; margin-bottom:0.7em; display:none;"></div>
                        <div class="button-group">
                            <button type="submit" class="cta-btn">Submit</button>
                            <button type="reset" class="cta-btn secondary" id="resetBtn">Reset</button>
                        </div>
                    </form>
                </div>
                <div class="display-info" id="displayInfo">
                    <?php echo $defaultInfoHtml; ?>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Coffee Cat. All rights reserved. Created by Satwinder Jeerh of WD-303.</p>
    </footer>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('signupForm');
        const display = document.getElementById('displayInfo');
        const contact = document.getElementById('contact');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const contactError = document.getElementById('contactError');
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');
        form.addEventListener('submit', function(e) {
            let valid = true;
            if (!/^\d{7,15}$/.test(contact.value)) {
                contactError.textContent = 'Contact number must be numerical';
                contactError.style.display = 'block';
                valid = false;
            } else {
                contactError.style.display = 'none';
            }
            if (username.value.length < 6) {
                usernameError.textContent = 'Username must be at least 6 characters.';
                usernameError.style.display = 'block';
                valid = false;
            } else {
                usernameError.style.display = 'none';
            }
            if (password.value.length < 6 || !/\d/.test(password.value)) {
                passwordError.textContent = 'Password must be at least 6 characters and contain at least 1 number.';
                passwordError.style.display = 'block';
                valid = false;
            } else {
                passwordError.style.display = 'none';
            }
            if (!valid) {
                e.preventDefault();
            } else {
                let info = '<h3>Submitted Information</h3><ul>';
                info += `<li><strong>First Name:</strong> ${form.firstName.value}</li>`;
                info += `<li><strong>Last Name:</strong> ${form.lastName.value}</li>`;
                info += `<li><strong>Gender:</strong> ${form.gender.value}</li>`;
                info += `<li><strong>Address:</strong> ${form.address.value}</li>`;
                info += `<li><strong>Contact Number:</strong> ${form.contact.value}</li>`;
                info += `<li><strong>Email Address:</strong> ${form.email.value}</li>`;
                info += `<li><strong>Date of Birth:</strong> ${form.dob.value}</li>`;
                info += `<li><strong>Username:</strong> ${form.username.value}</li>`;
                info += `<li><strong>Password:</strong> ${form.password.value}</li>`;
                info += '</ul>';
                display.innerHTML = info;
                e.preventDefault(); 
            }
        });
        document.getElementById('resetBtn').addEventListener('click', function(e) {
            let info = '<h3>Submitted Information</h3><ul>';
            <?php foreach ($fields as $label): ?>
                info += '<li><strong><?= htmlspecialchars($label) ?>:</strong> </li>';
            <?php endforeach; ?>
            info += '</ul>';
            display.innerHTML = info;
            contactError.style.display = 'none';
            usernameError.style.display = 'none';
            passwordError.style.display = 'none';
        });
    });
    </script>
</body>
</html>