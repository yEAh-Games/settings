document.addEventListener("DOMContentLoaded", function () {
    var profileCard = document.getElementById("profile-card");
    var userProfile;
    var userData = validateUserDataFromCookie();

    if (userData && userData.username) {
        var authorizedUsername = userData.username;

        fetch("https://accounts.yeahgames.net/data/settings/profiles.json")
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to retrieve profile data.");
                }
            })
            .then(function (profileData) {
                userProfile = profileData.find(function (profile) {
                    return profile.username === authorizedUsername;
                });

                if (userProfile) {
                    fetch("https://accounts.yeahgames.net/data/accounts.json")
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error("Failed to retrieve account data.");
                            }
                        })
                        .then(function (accountData) {
                            var userAccount = accountData.find(function (account) {
                                return account.username === userProfile.username;
                            });

                            if (userAccount) {
                                if (userAccount.admin) {
                                    userProfile.isAdmin = true;
                                    insertAdminHTML(userProfile);
                                } else {
                                    userProfile.isAdmin = false;
                                }
                            } else {
                                userProfile.isAdmin = false;
                            }


                            var testNameElement = document.getElementById("profileName");
                            testNameElement.value = userProfile.name;
                            var largeUsernameArea = document.getElementById("largeUsername");
                            largeUsernameArea.textContent = userData.username;

                            var roleArea = document.getElementById("roleDiv");
                            if (userData.admin) {
                                roleArea.textContent = "Admin";
                            }
                           
                            var profilePictureArea = document.getElementById("profilePicture");
                            var profilePictureSrc = "https://ugc.yeahgames.net/profile/p/default/png/" + "@" + userData.username + ".png";
 
                            profilePictureArea.setAttribute("src", profilePictureSrc);
                        })
                        .catch(function (error) {
                            console.error("Error:", error);
                        });
                } else {
                    throw new Error("Profile not found.");
                }
            })
            .catch(function (error) {
                console.error("Error:", error);
            });

        var adminsvg =
            '<a href="https://admin.yeahgames.net" style="text-decoration:none!important;" title="This user is a yEAh admin."><svg style="color:#ff4747!important;" class="VQS2tmQ_zFyBOC2tkmto YIUegm7fh_CpJbivTu6B MnxxlQlR1H0xJuMEE8Yr PeR2JZ9BZHYIH8Ea3F36 bcsWqjK52oeyT6oeC2Az gZ3KuFw1JESHhOJhjT8j _Oyukq8JlN1X9w2FmPds XIIs8ZOri3wm8Wnj9N_y Lld6j9B1iilEqA6j31e4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></a>';

        function insertAdminHTML(userProfile) {
            var profileAdminElement = document.getElementById("profileAdmin");
            if (userProfile.isAdmin) {
                profileAdminElement.innerHTML = adminsvg;
            } else {
                profileAdminElement.innerHTML = "<!--This user is not a yEAh Admin.-->";
            }
        }
    }
});