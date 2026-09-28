const adminController = require("../controller/admin.controller");
const categoriesController = require("../controller/categories.controller");

let token;

    const login = async (email, password) => {
    const data = { 
        "email": email , 
        "password": password 
        };
    
    const res = await adminController.postAdminLogin(data);
    token = res.body.token
    return token;
}

const newCategory = async () => {
    const body = {
        name:"Test Category " + Math.floor(Math.random() *10000)
    };
    const res = await categoriesController
        .postCategories(body)
        .set("Authorization", "Bearer " + token);

    return res;    
} 
// modo professor
const getCategoryId = async () => {
    const body = {
        name:"Test Category " + Math.floor(Math.random() *10000)
    };
    const res = await categoriesController
        .postCategories(body)
        .set("Authorization", "Bearer " + token);

    return res.body._id ;    
} 




module.exports = {
    login, 
    newCategory
};


