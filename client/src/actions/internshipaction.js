import axios from "axios";
import{
    INTERNSHIP_REQUEST,
    INTERNSHIP_SUCCESS,
    INTERNSHIP_FAIL,
    CLEAR_ERRORS,
}from "../constants/internshipconstants";

export const getInternship =
  (key = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: INTERNSHIP_REQUEST });

      let link = `/api/v1/internships?keyword=${key}`;

    //   if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //   }

      const { data } = await axios.get(link);

      dispatch({
        type: INTERNSHIP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INTERNSHIP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get INTERNSHIPS Details
// export const getInternshipDetails = (id) => async (dispatch) => {
//     try {
//       dispatch({ type: INTERNSHIP_DETAILS_REQUEST });
  
//       const { data } = await axios.get(`/api/v1/internhips/${id}`);
  
//       dispatch({
//         type: INTERNSHIP_DETAILS_SUCCESS,
//         payload: data.internship,
//       });
//     } catch (error) {
//       dispatch({
//         type: INTERNSHIP_DETAILS_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };