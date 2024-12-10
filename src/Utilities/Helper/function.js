let key = "userData";

export const setUserData = async (userData) => {
  localStorage.setItem(key, JSON.stringify(userData));
};

export const getUserData = async () => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearLocalStorage = async () =>{
  localStorage.clear();
}
