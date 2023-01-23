import Home from "./pages/Home.vue";
import AddNewVehicle from "./pages/AddNewVehicle.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addNewVehicle",
    name: "AddNewVehicle",
    component: AddNewVehicle,
  },
];

export { routes };
