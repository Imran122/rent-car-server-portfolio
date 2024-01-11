const RentCarPaymentData = require("../models/rentCarPayment");
const RentCarData = require("../models/rentCarUpload");
const User = require("../models/user");
const SellCarData = require("../models/sellCarUpload");
//host balance data infow ork
exports.superAdminBalanceData = async (req, res) => {
  try {
    const userId = req.user._id;
    const dataForAdmin = await RentCarPaymentData.find({}).exec();

    //running today data calculate

    const timeTodayDate = Date.now();
    const today = new Date(timeTodayDate);
    //calculate yester day
    const yesterday = today.getDate();
    const currentMonth = today.getMonth();

    //calculate last week day
    //var dateNow = new Date("2022-06-14T11:07:48.447Z");
    var dateNow = new Date();

    var firstDayOfTheWeek = dateNow.getDate() - dateNow.getDay() + 1;

    var lastDayOfTheWeek = firstDayOfTheWeek + 6;

    var firstDayOfLastWeek = new Date(dateNow.setDate(firstDayOfTheWeek - 7));
    var lastDayOfLastWeek = new Date(dateNow.setDate(lastDayOfTheWeek - 7));

    //end of calculate last week day
    /****************************** */
    //running week days calculate
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstdayRunningWeek = new Date(curr.setDate(first));

    var lastdayRunningWeek = new Date(curr.setDate(last));

    //end running week days calculate
    //current month date

    const monthfirstDay = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      2
    );

    const monthlastDay = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() + 1,
      1
    );

    //currrent month work end date
    //previous month work end date
    const firstDayPrevMonth = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() - 1,
      2
    );

    const lastDayPrevMonth = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      1
    );

    //cprevioust month work end date
    //year running data calculate
    const currentYear = new Date().getFullYear();

    const yearfirstDay = new Date(currentYear, 0, 2);
    //console.log(yearfirstDay.toLocaleDateString()); // 👉️ Sat Jan 01 2022

    const yearlastDay = new Date(currentYear, 11, 32);

    //year running data calculate

    let previousWeeklyCost = 0;
    let RunningWeeklyCost = 0;
    let todaysAllCost = 0;
    let yesterdaysAllCost = 0;
    let currentMonthCost = 0;
    let previousMonthCost = 0;
    let runningYearCost = 0;
    for (let index = 0; index < dataForAdmin.length; index++) {
      //totdays date
      var mydate = dataForAdmin[index].createdAt;

      //yesrderdate
      const dbMyDateYear = new Date(mydate).getFullYear();
      const dbMyDateMonth = new Date(mydate).getMonth();

      let total = dataForAdmin[index].totalCostAll;
      if (currentYear === dbMyDateYear && currentMonth === dbMyDateMonth) {
        if (today.getDate() === mydate.getDate()) {
          todaysAllCost = todaysAllCost + total;
        }
        if (yesterday - 1 === mydate.getDate()) {
          yesterdaysAllCost = yesterdaysAllCost + total;
        }
        //calculate running week cost
        if (
          firstdayRunningWeek.getDate() <= mydate.getDate() &&
          lastdayRunningWeek.getDate() >= mydate.getDate()
        ) {
          RunningWeeklyCost = RunningWeeklyCost + total;
        }

        if (
          firstDayOfLastWeek < dataForAdmin[index].createdAt &&
          lastDayOfLastWeek > dataForAdmin[index].createdAt
        ) {
          previousWeeklyCost = previousWeeklyCost + total;
        }
      }

      //running month
      if (currentYear === dbMyDateYear) {
        if (monthfirstDay < mydate && monthlastDay > mydate) {
          currentMonthCost = currentMonthCost + total;
        }
        if (firstDayPrevMonth < mydate && lastDayPrevMonth > mydate) {
          previousMonthCost = previousMonthCost + total;
        }
      }

      if (yearfirstDay < mydate && yearlastDay > mydate) {
        runningYearCost = runningYearCost + total;
      }
    }

    res.json({
      previousWeeklyCost: previousWeeklyCost,
      RunningWeeklyCost: RunningWeeklyCost,
      todaysAllCost: todaysAllCost,
      yesterdaysAllCost: yesterdaysAllCost,
      currentMonthCost: currentMonthCost,
      previousMonthCost: previousMonthCost,
      runningYearCost: runningYearCost,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//super admin most booked car list

exports.superAdminMostBookCar = async (req, res) => {
  try {
    const userId = req.user._id;
    const dataForAdmin = await RentCarPaymentData.find({}).exec();
    const count = {};

    dataForAdmin.forEach((element) => {
      count[element.carMake] = (count[element.carMake] || 0) + 1;
    });

    // 👇️ {one: 3, two: 2, three: 1}

    let result = [];
    for (let item in count) {
      if (count[item] >= 5) {
        result.push(dataForAdmin.find((o) => o.carMake === item));
      }
    }

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

//super admin month wise income for bar chart
exports.adminMonthIncomeChart = async (req, res) => {
  try {
    const dataForAdmin = await RentCarPaymentData.find({}).exec();
    const currentYear = new Date().getFullYear();
    //const currentYear = new Date().getFullYear();

    const yearfirstDay = new Date(currentYear, 0, 1);
    //console.log(yearfirstDay.toLocaleDateString());

    const yearlastDay = new Date(currentYear, 11, 31);
    ///console.log(yearlastDay.toLocaleDateString());
    //new code
    //in final data there is all data based
    let FinalData = [];
    for (let index = 0; index < dataForAdmin.length; index++) {
      //getiing year and all data for this year
      let dates = dataForAdmin[index].createdAt;

      let dateyesr = new Date(dates).getFullYear();

      if (dateyesr === currentYear) {
        FinalData = await RentCarPaymentData.find({
          createdAt: {
            $gte: yearfirstDay,
            $lte: yearlastDay,
          },
        });
      }
    }

    //work for every mmonthly data
    let montName = [
      "",
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    let chartResult = [];

    for (let index = 1; index < montName.length; index++) {
      sumOfId = (id) =>
        FinalData.filter((i) => i.createdAt.getMonth() + 1 === index).reduce(
          (a, b) => a + b.totalCostAll,
          0
        );
      const sumOf1 = sumOfId(1);

      let resultData = {
        Month: montName[index],
        monthlyEarning: sumOf1,
      };
      chartResult.push(resultData);
    }

    res.json(chartResult);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.supedAdminUserSellCarRentCarCount = async (req, res) => {
  try {
    var count = 0;
    const ResultSellCar = await SellCarData.find({}).exec();
    sellcount = ResultSellCar.length;
    //rent count
    const ResultRentCar = await RentCarData.find({}).exec();
    rentcount = ResultRentCar.length;
    //user count
    const ResultUser = await User.find({}).exec();
    UserCountData = ResultUser.length;

    let resultData = {
      TotalSellCar: sellcount,
      TotalRentCar: rentcount,
      TotalUserData: UserCountData,
    };
    //total user
    res.json(resultData);
  } catch (error) {
    res.json({ message: error });
  }
};
