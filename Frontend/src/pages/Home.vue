<script setup lang="ts">
import vehicleInterface from "../util/VehiclesInterface";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

let vehicleData = reactive<vehicleInterface[]>([]);
let tableKey = ref(Math.random());

// Coverage Variables
let distinctMakeCount = ref();
let totalVehicleCount = ref();
let distinctBodyCount = ref();

// Dropdown Variables
let distinctMake = reactive([]);
let distinctModel = reactive([]);

// Searched Variables
let selectedMake = ref("");
let selectedModel = ref("");

const getAll = async () => {
  // Api call to get data load in table
  let { data } = await axios.get("http://localhost:4000/vehicles");
  vehicleData = data.data;
  await axios
    .get(`http://localhost:4000/vehicles/distinctVehicle`)
    .then((response) => {
      totalVehicleCount = response.data.data.totalVehicleCount;
    });

  // Api call to get data load in vehicle coverage banner for MAKES and in MAKES Dropdown
  await axios
    .get(`http://localhost:4000/vehicles/distinctMake`)
    .then((response) => {
      distinctMakeCount.value = response.data.data.length; // For Coverage
      distinctMake = response.data.data; // For Dropdown
    });

  // Api call to get data load in vehicle coverage banner for BODYTYPE
  await axios
    .get(`http://localhost:4000/vehicles/distinctBody`)
    .then((response) => {
      distinctBodyCount.value = response.data.data.length;
    });
};

// Api call to load Model into dropdown selection
const getModel = async () => {
  await axios
    .get(
      `http://localhost:4000/vehicles/distinctModel?make=${selectedMake.value}`
    )
    .then((response) => {
      distinctModel.values = response.data.data;
    });
};

// Api call to load searched Make & Model into table
const searchVehicle = async () => {
  let { data } = await axios.get(
    `http://localhost:4000/vehicles/getVehiclesByMM?make=${selectedMake.value}&model=${selectedModel.value}`
  );
  vehicleData = data.data;
  tableKey.value = Math.random();
  console.log(vehicleData);
};

onMounted(() => {
  getAll();
});
</script>

<template>
  <div>
    <!-- Navbar -->
    <div class="flex justify-center items-center">
      <div class="navbar flex justify-center">
        <a class="btn btn-ghost normal-case text-3xl">Vehicle Coverage</a>
      </div>
    </div>

    <!-- Vehicle Coverage -->
    <div class="flex justify-evenly items-center mt-5">
      <div class="stats shadow-md">
        <div class="stat place-items-center">
          <div class="stat-title">Total Makes</div>
          <div class="stat-value">{{ distinctMakeCount }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Total Vehicles</div>
          <div class="stat-value">{{ totalVehicleCount }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Total Body Type</div>
          <div class="stat-value">{{ distinctBodyCount }}</div>
        </div>
      </div>
    </div>

    <div class="bg-gray-300 h-[1px] mt-5"></div>

    <div class="flex w-[80%] mx-auto justify-between items-center">
      <!-- Add New Vehicle Button -->
      <div class="mt-5">
        <router-link to="/addNewVehicle"
          ><Button btnName="Add New Vehicle" />
        </router-link>
      </div>

      <div class="mt-5">
        <select
          v-model="selectedMake"
          @change="getModel()"
          class="select select-bordered w-40 max-w-xs mr-2"
        >
          <option disabled selected value="">MAKE</option>
          <option v-for="d in distinctMake">{{ d.make }}</option>
        </select>
        <select
          v-model="selectedModel"
          class="select select-bordered w-40 max-w-xs m-2"
        >
          <option disabled selected value="">MODEL</option>
          <option v-for="d in distinctModel.values">{{ d.model }}</option>
        </select>
        <Button @click="searchVehicle()" btnName="Search Vehicle" />
      </div>
    </div>

    <!-- Vehicles Table -->
    <div class="mt-5">
      <Table :data="vehicleData" :key="tableKey" />
    </div>
  </div>
</template>
