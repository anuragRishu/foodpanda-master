import axios from "axios";

export async function getAllStates() {
  try {
    const response = await axios.get("http://localhost:3000/api/get-states");

    return response.data.states;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getSelectedStateData(stateName) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/state?statename=${stateName}`
    );
    console.log(response.data.matchedState[0].cities);
    return response.data.matchedState[0].cities;
  } catch (error) {
    console.error(error);
    return null;
  }
}
