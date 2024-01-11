const HostCarData = require("../models/rentCarUpload");
const RentCarPaymentData = require("../models/rentCarPayment");
const SellCarData = require("../models/sellCarUpload");
const User = require("../models/user");
const ReviewDataToHost = require("../models/reviewDataToHost");
//single rent cart details api start
exports.myCarListHost = async (req, res) => {
  try {
    const hostUserId = req.user._id;

    //finding data who has same user id
    const result = await HostCarData.find({
      hostUserId: { $in: [hostUserId] },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};
//single rent cart details api start
exports.mySellCarListHost = async (req, res) => {
  try {
    const userId = req.user._id;

    //finding data who has same user id
    const result = await SellCarData.find({
      userId: { $in: [userId] },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

//host balance data infow ork
exports.hostBalanceData = async (req, res) => {
  try {
    const userId = req.user._id;
    const dataForHost = await RentCarPaymentData.find({
      carUploadPersonHostId: userId,
    }).exec();
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
    for (let index = 0; index < dataForHost.length; index++) {
      //totdays date
      var mydate = dataForHost[index].createdAt;

      //yesrderdate
      const dbMyDateYear = new Date(mydate).getFullYear();
      const dbMyDateMonth = new Date(mydate).getMonth();

      let total = dataForHost[index].totalCostAll;
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
          firstDayOfLastWeek < dataForHost[index].createdAt &&
          lastDayOfLastWeek > dataForHost[index].createdAt
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

//review to host details data
exports.reviewToHostList = async (req, res) => {
  try {
    const carUploadPersonHostId = req.user._id;

    //finding data who has same user id
    const result = await ReviewDataToHost.find({
      carUploadPersonHostId: { $in: [carUploadPersonHostId] },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};
