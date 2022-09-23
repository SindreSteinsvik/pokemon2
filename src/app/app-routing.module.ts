import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginPage } from "./pages/login/login.page";
import { PokemanCataloguePage } from "./pages/pokeman-catalogue/pokeman-catalogue.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "trainer",
        component: TrainerPage,
        canActivate: [AuthGuard],
    },
    {
        path: "pokeman-catalogue",
        component: PokemanCataloguePage,
        canActivate: [AuthGuard],
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], //import modules
    exports: [RouterModule] // expose module and its features
})

export class AppRoutingModule {

}