import { CreateNewProductScene } from "./scenes/create-product/create-product.scene";
import { EditProductScene } from "./scenes/edit-product/edit-product.scene";
import { HomeScene } from "./scenes/home/home.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { OrderScene } from "./scenes/order-product/order.scene";
import { RegisterScene } from "./scenes/register/registe.scene";

export const routes = {
    public : [
        {path: '/login', scene: LoginScene},
        {path: '/register', scene: RegisterScene},
        {path: '/not-found', scene: NotFoundScene},

    ],
    private : [
        {path: '/home', scene: HomeScene},
        {path: '/addproduct', scene: CreateNewProductScene},
        {path: '/editproduct', scene: EditProductScene},
        {path: '/order', scene: OrderScene},
    ]
}