const RentCarData = require("../models/rentCarUpload");

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function addHoursToDate(objDate, carAvailabeTimeStart) {
    let intHours = parseInt(carAvailabeTimeStart.split(':')[0]);
    let intMin = parseInt(carAvailabeTimeStart.split(':')[1]);;
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60 * 1000;
    addMlSeconds += intMin * 60 * 1000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

    return newDateObj;
}
// http://localhost:5001/api/search-car/?lat=23.7641281&lng=90.44669909999999
exports.searchCar = async (req, res) => {
    const lat = req.query.lat;
    const lng = req.query.lng;
    let tripStartDateTime = req.query.tripStartDateTime;
    let tripEndDateTime = req.query.tripEndDateTime;

    RentCarData.find({}).lean().exec(function (err, data) {
        if (err) {
            res.json({ message: err });
        }

        let finalResult = [];
        for (let iterator of data) {
            let tempLat = iterator?.pickupAddress?.lat;
            let tempLng = iterator?.pickupAddress?.lng;

            const { carAvailabeDateStart, carAvailabeDateEnd, carAvailabeTimeStart, carAvailabeTimeEnd, carAvailability } = iterator;


            if (tempLat && tempLng) {
                iterator.distance = getDistanceFromLatLonInKm(
                    lat, lng, iterator.pickupAddress.lat, iterator.pickupAddress.lng,
                )

                if (carAvailability === 'alwaysAvailable') {
                    if (iterator.distance <= 15 && iterator.requestStatus === true) {
                        finalResult.push(iterator);
                    }
                } else {
                    if (tripStartDateTime && tripEndDateTime) {
                        tripStartDateTime = (new Date(tripStartDateTime)).getTime();
                        tripEndDateTime = (new Date(tripEndDateTime)).getTime();

                        if (carAvailabeDateStart && carAvailabeDateEnd) {

                            let availableStart = addHoursToDate(carAvailabeDateStart, carAvailabeTimeStart);
                            let availableEnd = addHoursToDate(carAvailabeDateEnd, carAvailabeTimeEnd);
                            
                            if (carAvailability === 'ClanderAvailable') {
                                availableStart = (new Date(availableStart)).getTime();
                                availableEnd = (new Date(availableEnd)).getTime();
                                if (iterator.distance <= 15 &&
                                    iterator.requestStatus === true &&
                                    tripStartDateTime >= availableStart &&
                                    tripEndDateTime <= availableEnd
                                ) {
                                    finalResult.push(iterator);
                                }
                            } else {

                                let tripStartDay = (new Date(tripStartDateTime)).getDay();
                                let tripEndDay = (new Date(tripEndDateTime)).getDay();
                                let Difference_In_Days = (tripEndDateTime - tripStartDateTime) / (1000 * 3600 * 24);

                                availableStart = (new Date(availableStart)).getDay();
                                availableEnd = (new Date(availableEnd)).getDay();

                                if (Difference_In_Days <= 2 && (tripStartDay === 0 || tripStartDay === 6) &&
                                    (tripEndDay === 0 || tripEndDay === 6) &&
                                    (availableStart === 0 || availableStart === 6) &&
                                    (availableEnd === 0 || availableEnd === 6) &&
                                    iterator.distance <= 15 && iterator.requestStatus === true
                                ) {
                                    finalResult.push(iterator);
                                }
                            }
                        }
                        
                    } else {
                        if (iterator.distance <= 15 && iterator.requestStatus === true) {
                            finalResult.push(iterator);
                        }
                    }
                }


            }

        }
        finalResult.sort(function (first, second) {
            if (first.distance > second.distance) {
                return 1;
            }
            if (first.distance < second.distance) {
                return -1;
            }
            return 0;
        });
        res.json(finalResult);
    });
};