// profile
export const ProfilePageTemplate = `
<div class="profile {{type}}">
    <div class="profile-form">
        <div class="profile-form-avatar">
            <div class="profile-form-avatar__image"> / Photo / </div>
            <input type="file" id="avatar" class="profile-form-avatar__input">
        </div>
        <div class="profile-form__name">{{user.first_name}}</div>
        
        <div class="profile-form-table">
            <!-- Email -->
           <line-form-field-component props="{ labelText: 'Email', value: '{{user.email}}', id: 'email', type: 'email' }"/>
           <divider-component />
            <!-- Login -->
           <line-form-field-component props="{ labelText: 'Login', value: '{{user.login}}', id: 'login', type: 'text' }"/>
           <divider-component />
            <!-- First Name -->
           <line-form-field-component props="{ labelText: 'First Name', value: '{{user.first_name}}', id: 'first_name', type: 'text' }"/>
           <divider-component />
            <!-- Second Name -->
           <line-form-field-component props="{ labelText: 'Second Name', value: '{{user.second_name}}', id: 'second_name', type: 'text' }"/>
           <divider-component />
           <!--  User Name -->
           <line-form-field-component props="{ labelText: 'Username', value: '{{user.username}}', id: 'display_name', type: 'text' }"/>
           <divider-component />
           <!--  Phone -->
           <line-form-field-component props="{ labelText: 'Phone', value: '{{user.phone_number}}', id: 'phone', type: 'tel' }"/>
           
        <div class="profile-form-buttons">
           {{ buttonsTemplate }}
        </div>
        
    </div>
</div>`;

// change password form
export const ChangePasswordPageTemplate = `
<div class="profile change-password">
    <div class="profile-form">
    
        <div class="profile-form__name">Change your password</div>
        
        <div class="profile-form-table">
            <!-- Old Password -->
           <line-form-field-component props="{ labelText: 'Old password', value: '', id: 'oldPassword', type: 'password' }"/>
           <divider-component />
           <!--  New Password -->
           <line-form-field-component props="{ labelText: 'New password', value: '', id: 'newPassword', type: 'password' }"/>
           <divider-component />
           <!--  Confirm Password -->
           <line-form-field-component props="{ labelText: 'Confirm New Password', value: '', id: 'confirmPassword', type: 'password' }"/>
           
        <div class="profile-form-buttons">
           {{ buttonsTemplate }}
        </div>
    </div>
</div>`;