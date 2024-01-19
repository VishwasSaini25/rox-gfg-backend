import axios from "axios";

export const fetchCombinedData = async (req, res) => {
  const month = req.query.month || "3";
  const searchQuery = req.query.search || "";
  const page=parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 3;
  console.log("hello") ;
  try {
    const transactionsApiUrl = `http://localhost:8000/api/transactions?search=${searchQuery}&page=${page}&perPage=${perPage}`;
    const statisticsApiUrl =  `http://localhost:8000/api/statistics?month=${month}`;
    const barChartApiUrl = `http://localhost:8000/api/charts/barChart?month=${month}`;
    const pieChartApiUrl = `http://localhost:8000/api/charts/pieChart?month=${month}`;


    const transactionsResponse=await axios.get(transactionsApiUrl);
    const statisticsResponse=await axios.get(statisticsApiUrl);
    const barChartResponse=await axios.get(barChartApiUrl);
    const pieChartResponse=await axios.get(pieChartApiUrl);
    const combinedData = {
        transactions: transactionsResponse.data,
        statistics: statisticsResponse.data,
        barChart: barChartResponse.data,
        pieChart: pieChartResponse.data,
    };
    
    res.status(200).json({ success: true, data: combinedData });
  } catch (error) {
    console.log("ERROR: Failed to generate combiend response", error);
    res.status(500).json({ success: false, error: error });
  }
};