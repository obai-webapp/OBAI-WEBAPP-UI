import stepOne from '../assets/images/steps-img/01.png';
import stepTwo from '@images/steps-img/02.png';
import stepThree from '@images/steps-img/03.png';
import stepFour from '@images/steps-img/04.png';
import stepFive from '@images/steps-img/05.png';
import stepSix from '@images/steps-img/06.png';
import stepSeven from '@images/steps-img/07.png';
import stepEight from '@images/steps-img/08.png';
import stepNine from '@images/steps-img/09.png';
import stepTen from '@images/steps-img/10.png';
import stepEleven from '@images/steps-img/11.png';
import stepTwelve from '@images/steps-img/12.png';
import stepThirteen from '@images/steps-img/13.png';
import stepFourteen from '@images/steps-img/14.png';
import stepFifteen from '@images/steps-img/15.png';
import stepSixteen from '@images/steps-img/16.png';
import stepSeventeen from '@images/steps-img/17.png';
import stepEighteen from '@images/steps-img/18.png';
import stepNineteen from '@images/steps-img/19.png';
import stepTwenty from '@images/steps-img/20.png';
import stepTwentyOne from '@images/steps-img/21.png';

export const base64ToBlob = (base64Data) => {
    const byteString = atob(base64Data.split(',')[1]);
    const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new File([ab], { type: mimeString });
};

export const showLoader = (isShow) => {
    const elem = document.getElementById('main_stepper');
    const loader = document.getElementById('textLoader');

    if (!loader) return;

    if (isShow) {
        loader.style.display = 'block';
        elem.style.filter = 'blur(5px)';
    } else {
        loader.style.display = 'none';
        elem.style.filter = 'unset';
    }
};

export const carImages = [
    {
        currentStep: 1,
        currentSubStep: 1,
        dataUri: ['http://127.0.0.1:4000/uploads/1713778980057-image.jpg'],
        title: 'Hood',
        dentType: {
            id: 4,
            title: '31 - 50 dents',
            stepNo: 3
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 2,
        dataUri: ['http://127.0.0.1:4000/uploads/1713778986349-image.jpg'],
        title: 'PassengerFender',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 3,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779009286-image.jpg'],
        title: 'Cowl',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 4,
            title: 'Quarter',
            tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 4,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779017273-image.jpg'],
        title: 'PassengerFrontDoor',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 4,
            title: 'Quarter',
            tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 5,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779023170-image.jpg'],
        title: 'PassengerRoofRail',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 6,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779029675-image.jpg'],
        title: 'Roof',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 7,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779036021-image.jpg'],
        title: 'Sunroof',
        dentType: {
            id: 5,
            title: '51 - 75 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 8,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779042031-image.jpg'],
        title: 'PassengerRearDoor',
        dentType: {
            id: 5,
            title: '51 - 75 dents'
        },
        dentSize: {
            id: 3,
            title: 'Nickel',
            tooltipContent: ' Diameter: 21.21 mm, Thickness: 1.95 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 9,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779049301-image.jpg'],
        title: 'PassengerQuarterPanel',
        dentType: {
            id: 3,
            title: '16 - 30 dents'
        },
        dentSize: {
            id: 3,
            title: 'Nickel',
            tooltipContent: ' Diameter: 21.21 mm, Thickness: 1.95 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 10,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779057881-image.jpg'],
        title: 'DeckLidGate',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 11,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779065402-image.jpg'],
        title: 'DriverQuarterPanel',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 12,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779070687-image.jpg'],
        title: 'DriverRearDoor',
        dentType: {
            id: 3,
            title: '16 - 30 dents'
        },
        dentSize: {
            id: 4,
            title: 'Quarter',
            tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 13,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779076870-image.jpg'],
        title: 'DriverRoofRail',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 3,
            title: 'Nickel',
            tooltipContent: ' Diameter: 21.21 mm, Thickness: 1.95 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 14,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779085047-image.jpg'],
        title: 'DriverFrontDoor',
        dentType: {
            id: 4,
            title: '31 - 50 dents'
        },
        dentSize: {
            id: 5,
            title: 'Half-Dollar',
            tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 15,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779091304-image.jpg'],
        title: 'DriverFender',
        dentType: {
            id: 3,
            title: '16 - 30 dents'
        },
        dentSize: {
            id: 4,
            title: 'Quarter',
            tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
        }
    },
    {
        currentStep: 1,
        currentSubStep: 16,
        dataUri: ['http://127.0.0.1:4000/uploads/1713779115490-image.jpg'],
        title: 'DashboardVin',
        dentType: {
            id: 2,
            title: '6 - 15 dents'
        },
        dentSize: {
            id: 1,
            title: 'Dime',
            tooltipContent: 'Diameter: 17.91 mm, Thickness: 1.35 mm'
        }
    }
];

export const fullData = {
    capturedImages: [
        {
            currentStep: 1,
            currentSubStep: 1,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783051582-image.jpg'],
            title: 'Hood',
            dentType: {
                id: 3,
                title: '16 - 30 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 2,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783059400-image.jpg'],
            title: 'PassengerFender',
            dentType: {
                id: 4,
                title: '31 - 50 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 3,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783065230-image.jpg'],
            title: 'Cowl',
            dentType: {
                id: 2,
                title: '6 - 15 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 4,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783071970-image.jpg'],
            title: 'PassengerFrontDoor',
            dentType: {
                id: 3,
                title: '16 - 30 dents'
            },
            dentSize: {
                id: 4,
                title: 'Quarter',
                tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 5,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783087516-image.jpg'],
            title: 'PassengerRoofRail',
            dentType: {
                id: 5,
                title: '51 - 75 dents'
            },
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 6,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783096494-image.jpg'],
            title: 'Roof',
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            },
            dentType: {
                id: 3,
                title: '16 - 30 dents'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 7,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783108783-image.jpg'],
            dentType: {
                id: 1,
                title: '1 - 5 dents'
            },
            dentSize: {
                id: 3,
                title: 'Nickel',
                tooltipContent: ' Diameter: 21.21 mm, Thickness: 1.95 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 8,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783115001-image.jpg'],
            title: 'Sunroof',
            dentType: {
                id: 5,
                title: '51 - 75 dents'
            },
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 9,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783121806-image.jpg'],
            title: 'PassengerRearDoor',
            dentType: {
                id: 3,
                title: '16 - 30 dents'
            },
            dentSize: {
                id: 4,
                title: 'Quarter',
                tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 10,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783128166-image.jpg'],
            title: 'PassengerQuarterPanel',
            dentType: {
                id: 4,
                title: '31 - 50 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 11,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783133952-image.jpg'],
            title: 'DeckLidGate',
            dentType: {
                id: 1,
                title: '1 - 5 dents'
            },
            dentSize: {
                id: 4,
                title: 'Quarter',
                tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 12,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783140717-image.jpg'],
            title: 'DriverQuarterPanel',
            dentType: {
                id: 2,
                title: '6 - 15 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 13,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783147828-image.jpg'],
            title: 'DriverRearDoor',
            dentType: {
                id: 6,
                title: 'It’s, like, really bad (76+)'
            },
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 14,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783187997-image.jpg'],
            dentType: {
                id: 3,
                title: '16 - 30 dents'
            },
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 15,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783208272-image.jpg'],
            title: 'DriverRoofRail',
            dentType: {
                id: 2,
                title: '6 - 15 dents'
            },
            dentSize: {
                id: 5,
                title: 'Half-Dollar',
                tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 16,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783218048-image.jpg'],
            title: 'DriverFrontDoor',
            dentType: {
                id: 4,
                title: '31 - 50 dents'
            },
            dentSize: {
                id: 6,
                title: 'It’s really bad',
                tooltipContent:
                    'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
            }
        },
        {
            currentStep: 1,
            currentSubStep: 17,
            dataUri: ['http://127.0.0.1:4000/uploads/1713783229233-image.jpg'],
            title: 'DriverFender'
        }
    ],
    selectedQualityDents: [null, [3], [4], [2], [3], [5], [3], [1], [5], [3], [4], [1], [2], [6], [3], [2], [4]],
    selectedQualitySizes: [null, [6], [6], [6], [4], [5], [5], [3], [5], [4], [6], [4], [6], [5], [5], [5], [6]],
    vinReviewedImages: {
        dashboardJamVin: [],
        doorJamVin: []
    }
};

export const screenList = [
    {
        screenName: 'WELCOME',
        stepImage: '',
        stepNo: 0
    },
    {
        screenName: 'HOW_IT_WORKS',
        stepImage: '',
        stepNo: 1
    },
    {
        screenName: 'Hood',
        stepImage: stepOne,
        stepNo: 2,
        side: 'Front',
        screen: 'HOOD'
    },
    { screenName: 'PassengerFender', screen: 'R_FENDER', stepImage: stepTwo, stepNo: 3, side: 'Front' },
    { screenName: 'Cowl', screen: 'COWL', stepImage: stepThree, stepNo: 4, side: 'Front' },
    { screenName: 'PassengerFrontDoor', screen: 'RF_DOOR', stepImage: stepFour, stepNo: 5, side: 'Passenger Side' },
    { screenName: 'PassengerRoofRail', screen: 'R_ROOF_RAIL', stepImage: stepFive, stepNo: 6, side: 'Passenger Side' },
    { screenName: 'Roof', screen: 'ROOF', stepImage: stepSix, stepNo: 7, side: 'Overhead' },
    { screenName: 'Sunroof', screen: 'SUN_ROOF', stepImage: stepSeven, stepNo: 8, side: 'Overhead' },
    { screenName: 'PassengerRearDoor', screen: 'RR_DOOR', stepImage: stepEight, stepNo: 9, side: 'Passenger Side' },
    { screenName: 'PassengerQuarterPanel', screen: 'R_QUARTER', stepImage: stepNine, stepNo: 10, side: 'Rear' },
    { screenName: 'DeckLidGate', stepImage: stepTen, stepNo: 11, side: 'Rear' },
    { screenName: 'DriverQuarterPanel', screen: 'L_QUARTER', stepImage: stepEleven, stepNo: 12, side: 'Rear' },
    { screenName: 'DriverRearDoor', screen: 'LR_DOOR', stepImage: stepTwelve, stepNo: 13, side: 'Driver Side' },
    { screenName: 'DriverRoofRail', screen: 'L_ROOF_RAIL', stepImage: stepThirteen, stepNo: 14, side: 'Driver Side' },
    { screenName: 'DriverFrontDoor', screen: 'LF_DOOR', stepImage: stepFourteen, stepNo: 15, side: 'Driver Side' },
    { screenName: 'DriverFender', screen: 'L_FENDER', stepImage: stepFifteen, stepNo: 16, side: 'Front' },
    { screenName: 'DashboardVin', screen: '', stepImage: stepSixteen, stepNo: 17, side: 'Vin' },
    { screenName: 'DoorJamVIN', screen: '', stepImage: stepSeventeen, stepNo: 18, side: 'Vin' },
    { screenName: 'VinReview', screen: '', stepImage: stepEighteen, stepNo: 19, side: 'Vin' },
    { screenName: 'Odometer', screen: '', stepImage: stepNineteen, stepNo: 20, side: 'Odometer' },
    { screenName: 'OdometerReview', screen: '', stepImage: stepTwenty, stepNo: 21, side: 'Odometer' },
    { screenName: 'ReviewAndSubmit', screen: '', stepImage: stepTwentyOne, stepNo: 22 }
];

export const dentsData = [
    {
        id: 1,
        title: '1 - 5 dents',
        value: '1 to 5'
    },
    {
        id: 2,
        title: '6 - 15 dents',
        value: '6 to 15'
    },
    {
        id: 3,
        title: '16 - 30 dents',
        value: '16 to 30'
    },
    {
        id: 4,
        title: '31 - 50 dents',
        value: '31 to 50'
    },
    {
        id: 5,
        title: '51 - 75 dents',
        value: '51 to 75'
    },
    {
        id: 6,
        title: 'It’s, like, really bad (76+)',
        value: 'More then 76'
    },
    {
        id: 7,
        title: 'No Dent',
        value: 'NULL'
    }
];

export const dentSize = [
    {
        id: 1,
        title: 'Dime',
        tooltipContent: 'Diameter: 17.91 mm, Thickness: 1.35 mm'
    },
    {
        id: 3,
        title: 'Nickel',
        tooltipContent: ' Diameter: 21.21 mm, Thickness: 1.95 mm'
    },
    {
        id: 4,
        title: 'Quarter',
        tooltipContent: 'Diameter: 24.26 mm, Thickness: 1.75 mm'
    },
    {
        id: 5,
        title: 'Half-Dollar',
        tooltipContent: 'Diameter: 30.61 mm, Thickness: 2.15 mm'
    },
    {
        id: 6,
        title: 'It’s really bad',
        tooltipContent:
            'Indicates a severe or significant dent that may greatly impact the appearance or functionality of the car. This option suggests that the dent is beyond typical wear and tear and may require professional repair or attention.'
    },
    {
        id: 7,
        title: 'Size not detected',
        tooltipContent: 'NULL'
    }
];

export const getDamageInfo = (size, noOfDents) => {
    const f_index = dentsData.findIndex((e) => String(e.value).toLowerCase() === String(noOfDents).toLowerCase());

    const s_index = dentSize.findIndex((e) => String(e.title).toLowerCase() === String(size).toLowerCase());

    return {
        dentType: f_index >= 0 ? dentsData[f_index].value : 'NULL',
        dentSize: s_index >= 0 ? dentSize[s_index].title : 'NULL'
    };
};

export const dummyData = [
    {
        title: 'Hood',
        step: 0,
        images: ['http://127.0.0.1:4000/uploads/1713873344016-image.jpg'],
        isCheckQuality: false,
        dentType: '6 - 15 dents',
        dentSize: 'Quarter'
    },
    {
        title: 'PassengerFender',
        step: 1,
        images: ['http://127.0.0.1:4000/uploads/1713873353865-image.jpg'],
        isCheckQuality: false,
        dentType: '31 - 50 dents',
        dentSize: 'Nickel'
    },
    {
        title: 'Cowl',
        step: 2,
        images: ['http://127.0.0.1:4000/uploads/1713873361442-image.jpg'],
        isCheckQuality: false,
        dentType: '16 - 30 dents',
        dentSize: 'Quarter'
    },
    {
        title: 'PassengerFrontDoor',
        step: 3,
        images: ['http://127.0.0.1:4000/uploads/1713873370183-image.jpg'],
        isCheckQuality: false,
        dentType: '6 - 15 dents',
        dentSize: 'Half-Dollar'
    },
    {
        title: 'PassengerRoofRail',
        step: 4,
        images: [
            'http://127.0.0.1:4000/uploads/1713873380037-image.jpg',
            'http://127.0.0.1:4000/uploads/1713873380037-image.jpg',
            'http://127.0.0.1:4000/uploads/1713873380037-image.jpg'
        ],
        isCheckQuality: false,
        dentType: '31 - 50 dents',
        dentSize: 'Quarter'
    },
    {
        title: 'Roof',
        step: 5,
        images: ['http://127.0.0.1:4000/uploads/1713873389283-image.jpg'],
        isCheckQuality: false,
        dentType: '16 - 30 dents',
        dentSize: 'Quarter'
    },
    {
        title: 'Sunroof',
        step: 6,
        images: ['http://127.0.0.1:4000/uploads/1713873398787-image.jpg'],
        isCheckQuality: false,
        dentType: '16 - 30 dents',
        dentSize: 'Nickel'
    },
    {
        title: 'PassengerRearDoor',
        step: 7,
        images: ['http://127.0.0.1:4000/uploads/1713873433583-image.jpg'],
        isCheckQuality: false,
        dentType: '16 - 30 dents',
        dentSize: 'Half-Dollar'
    }
    // {
    //     title: 'PassengerQuarterPanel',
    //     step: 8,
    //     images: ['http://127.0.0.1:4000/uploads/1713873443940-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '6 - 15 dents',
    //     dentSize: 'Quarter'
    // },
    // {
    //     title: 'DeckLidGate',
    //     step: 9,
    //     images: ['http://127.0.0.1:4000/uploads/1713873487948-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '31 - 50 dents',
    //     dentSize: 'Nickel'
    // },
    // {
    //     title: 'DriverQuarterPanel',
    //     step: 10,
    //     images: ['http://127.0.0.1:4000/uploads/1713873504540-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '31 - 50 dents',
    //     dentSize: 'Nickel'
    // },
    // {
    //     title: 'DriverRearDoor',
    //     step: 11,
    //     images: ['http://127.0.0.1:4000/uploads/1713873513098-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '31 - 50 dents',
    //     dentSize: 'It’s really bad'
    // },
    // {
    //     title: 'DriverRoofRail',
    //     step: 12,
    //     images: ['http://127.0.0.1:4000/uploads/1713873521666-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '1 - 5 dents',
    //     dentSize: 'Nickel'
    // },
    // {
    //     title: 'DriverFrontDoor',
    //     step: 13,
    //     images: ['http://127.0.0.1:4000/uploads/1713873531399-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '51 - 75 dents',
    //     dentSize: 'Half-Dollar'
    // },
    // {
    //     title: 'DriverFender',
    //     step: 14,
    //     images: ['http://127.0.0.1:4000/uploads/1713873539732-image.jpg'],
    //     isCheckQuality: false,
    //     dentType: '16 - 30 dents',
    //     dentSize: 'Quarter'
    // },
    // {
    //     title: 'DashboardVin',
    //     step: 15,
    //     images: [
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg'
    //     ],
    //     isCheckQuality: false,
    //     dentType: '31 - 50 dents',
    //     dentSize: 'It’s really bad'
    // },
    // {
    //     title: 'DoorJamVIN',
    //     step: 16,
    //     images: [
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg'
    //     ],
    //     isCheckQuality: false,
    //     dentType: '1 - 5 dents',
    //     dentSize: 'Nickel'
    // },
    // {
    //     title: 'VinReview',
    //     step: 17,
    //     images: [],
    //     isCheckQuality: false,
    //     doorJamVinImages: [
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg'
    //     ],
    //     dashboardVinImages: [
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg',
    //         'http://127.0.0.1:4000/uploads/1716551248876-image.jpg'
    //     ],
    //     vinNumber: '123456789',
    //     dentType: '',
    //     dentSize: ''
    // },
    // {
    //     title: 'Odometer',
    //     step: 18,
    //     images: ['http://127.0.0.1:4000/uploads/1713952132567-image.jpg'],
    //     isCheckQuality: false
    // },
    // {
    //     title: 'OdometerReview',
    //     step: 19,
    //     images: [],
    //     isCheckQuality: false,
    //     odoMeterNumber: '123-321',
    //     miles: 'km',
    //     dentType: '',
    //     dentSize: ''
    // }
];

export const priceData = [
    {
        severityClass: 'VERY_LIGHT',
        numberOfDents: '1 to 5 (A)',
        carSides: [
            {
                title: 'HOOD',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '100' },
                    { title: 'Quarter', price: '125' },
                    { title: 'Half', price: '150' }
                ]
            },
            {
                title: 'R_FENDER',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'L_FENDER',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'COWL',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'ROOF',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '200' }
                ]
            },
            {
                title: 'VAN/SUV/X-CAB',
                prices: [
                    { title: 'Dime', price: '125' },
                    { title: 'Nickel', price: '156' },
                    { title: 'Quarter', price: '188' },
                    { title: 'Half', price: '250' }
                ]
            },
            {
                title: 'SUN_ROOF',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'R_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RF_DOOR',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'LF_DOOR',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'RR_DOOR',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'LR_DOOR',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'R_QUARTER',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'L_QUARTER',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            },
            {
                title: 'DECK_LID_GATE',
                prices: [
                    { title: 'Dime', price: '75' },
                    { title: 'Nickel', price: '75' },
                    { title: 'Quarter', price: '100' },
                    { title: 'Half', price: '125' }
                ]
            }
        ]
    },
    {
        severityClass: 'LIGHT',
        numberOfDents: '6 to 15 (B)',
        carSides: [
            {
                title: 'HOOD',
                prices: [
                    { title: 'Dime', price: '125' },
                    { title: 'Nickel', price: '150' },
                    { title: 'Quarter', price: '175' },
                    { title: 'Half', price: '225' }
                ]
            },
            {
                title: 'R_FENDER',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'L_FENDER',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'COWL',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'ROOF',
                prices: [
                    { title: 'Dime', price: '175' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '250' }
                ]
            },
            {
                title: 'VAN/SUV/X-CAB',
                prices: [
                    { title: 'Dime', price: '219' },
                    { title: 'Nickel', price: '250' },
                    { title: 'Quarter', price: '281' },
                    { title: 'Half', price: '313' }
                ]
            },
            {
                title: 'SUN_ROOF',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'R_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RF_DOOR',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'LF_DOOR',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'RR_DOOR',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'LR_DOOR',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'R_QUARTER',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'L_QUARTER',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '150' },
                    { title: 'Half', price: '175' }
                ]
            },
            {
                title: 'DECK_LID_GATE',
                prices: [
                    { title: 'Dime', price: '100' },
                    { title: 'Nickel', price: '125' },
                    { title: 'Quarter', price: '175' },
                    { title: 'Half', price: '200' }
                ]
            }
        ]
    },
    {
        severityClass: 'MODERATE',
        numberOfDents: '16 to 30 (C)',
        carSides: [
            {
                title: 'HOOD',
                prices: [
                    { title: 'Dime', price: '175' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '300' }
                ]
            },
            {
                title: 'R_FENDER',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'L_FENDER',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'COWL',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'ROOF',
                prices: [
                    { title: 'Dime', price: '250' },
                    { title: 'Nickel', price: '275' },
                    { title: 'Quarter', price: '325' },
                    { title: 'Half', price: '375' }
                ]
            },
            {
                title: 'VAN/SUV/X-CAB',
                prices: [
                    { title: 'Dime', price: '313' },
                    { title: 'Nickel', price: '344' },
                    { title: 'Quarter', price: '406' },
                    { title: 'Half', price: '469' }
                ]
            },
            {
                title: 'SUN_ROOF',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'R_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RF_DOOR',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'LF_DOOR',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'RR_DOOR',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'LR_DOOR',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'R_QUARTER',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'L_QUARTER',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '200' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '275' }
                ]
            },
            {
                title: 'DECK_LID_GATE',
                prices: [
                    { title: 'Dime', price: '150' },
                    { title: 'Nickel', price: '175' },
                    { title: 'Quarter', price: '225' },
                    { title: 'Half', price: '250' }
                ]
            }
        ]
    },
    {
        severityClass: 'MEDIUM',
        numberOfDents: '31 to 50 (D)',
        carSides: [
            {
                title: 'HOOD',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '325' },
                    { title: 'Quarter', price: '375' },
                    { title: 'Half', price: '450' }
                ]
            },
            {
                title: 'R_FENDER',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'L_FENDER',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'COWL',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'ROOF',
                prices: [
                    { title: 'Dime', price: '350' },
                    { title: 'Nickel', price: '400' },
                    { title: 'Quarter', price: '475' },
                    { title: 'Half', price: '525' }
                ]
            },
            {
                title: 'VAN/SUV/X-CAB',
                prices: [
                    { title: 'Dime', price: '438' },
                    { title: 'Nickel', price: '500' },
                    { title: 'Quarter', price: '594' },
                    { title: 'Half', price: '656' }
                ]
            },
            {
                title: 'SUN_ROOF',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'R_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RF_DOOR',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'LF_DOOR',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'RR_DOOR',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'LR_DOOR',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'R_QUARTER',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'L_QUARTER',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '225' },
                    { title: 'Quarter', price: '275' },
                    { title: 'Half', price: '350' }
                ]
            },
            {
                title: 'DECK_LID_GATE',
                prices: [
                    { title: 'Dime', price: '200' },
                    { title: 'Nickel', price: '250' },
                    { title: 'Quarter', price: '300' },
                    { title: 'Half', price: '350' }
                ]
            }
        ]
    },
    {
        severityClass: 'HEAVY',
        numberOfDents: '51 to 75 (E)',
        carSides: [
            {
                prices: [
                    { title: 'Dime', price: '325' },
                    { title: 'Nickel', price: '350' },
                    { title: 'Quarter', price: '450' },
                    { title: 'Half', price: '575' }
                ]
            },
            {
                title: 'R_FENDER',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_FENDER',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'COWL',
                prices: [
                    { title: 'Dime', price: 'CR' },
                    { title: 'Nickel', price: 'CR' },
                    { title: 'Quarter', price: 'CR' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'ROOF',
                prices: [
                    { title: 'Dime', price: '425' },
                    { title: 'Nickel', price: '500' },
                    { title: 'Quarter', price: '625' },
                    { title: 'Half', price: '725' }
                ]
            },
            {
                title: 'VAN/SUV/X-CAB',
                prices: [
                    { title: 'Dime', price: '531' },
                    { title: 'Nickel', price: '625' },
                    { title: 'Quarter', price: '781' },
                    { title: 'Half', price: '906' }
                ]
            },
            {
                title: 'SUN_ROOF',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'R_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: 'CR' },
                    { title: 'Nickel', price: 'CR' },
                    { title: 'Quarter', price: 'CR' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'L_ROOF_RAIL',
                prices: [
                    { title: 'Dime', price: 'CR' },
                    { title: 'Nickel', price: 'CR' },
                    { title: 'Quarter', price: 'CR' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RF_DOOR',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'LF_DOOR',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'RR_DOOR',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'LR_DOOR',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: 'CR' }
                ]
            },
            {
                title: 'R_QUARTER',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: '400' }
                ]
            },
            {
                title: 'L_QUARTER',
                prices: [
                    { title: 'Dime', price: '275' },
                    { title: 'Nickel', price: '300' },
                    { title: 'Quarter', price: '350' },
                    { title: 'Half', price: '400' }
                ]
            },
            {
                title: 'DECK_LID_GATE',
                prices: [
                    { title: 'Dime', price: '350' },
                    { title: 'Nickel', price: '400' },
                    { title: 'Quarter', price: '450' },
                    { title: 'Half', price: '550' }
                ]
            }
        ]
    }
];

// 19
export const inputData = [
    {
        title: 'Hood',
        step: 0,
        images: ['http://127.0.0.1:4000/uploads/1716961200191-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'PassengerFender',
        step: 1,
        images: ['http://127.0.0.1:4000/uploads/1716961289606-image.jpg'],
        isCheckQuality: false,
        dentType: 'NULL',
        dentSize: 'NULL'
    },
    {
        title: 'Cowl',
        step: 2,
        images: ['http://127.0.0.1:4000/uploads/1716961340156-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'PassengerFrontDoor',
        step: 3,
        images: ['http://127.0.0.1:4000/uploads/1716961375540-image.jpg'],
        isCheckQuality: false,
        dentType: '6 - 15 dents',
        dentSize: 'Dime'
    },
    {
        title: 'PassengerRoofRail',
        step: 4,
        images: ['http://127.0.0.1:4000/uploads/1716961405936-image.jpg'],
        isCheckQuality: false,
        dentType: '6 - 15 dents',
        dentSize: 'Quarter'
    },
    {
        title: 'Roof',
        step: 5,
        images: ['http://127.0.0.1:4000/uploads/1716961433146-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'Sunroof',
        step: 6,
        images: ['http://127.0.0.1:4000/uploads/1716961567163-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'PassengerRearDoor',
        step: 7,
        images: ['http://127.0.0.1:4000/uploads/1716961947566-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'PassengerQuarterPanel',
        step: 8,
        images: ['http://127.0.0.1:4000/uploads/1716961993600-image.jpg'],
        isCheckQuality: false,
        dentType: 'NULL',
        dentSize: 'NULL'
    },
    {
        title: 'DeckLidGate',
        step: 9,
        images: ['http://127.0.0.1:4000/uploads/1716962024230-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'It’s really bad'
    },
    {
        title: 'DriverQuarterPanel',
        step: 10,
        images: ['http://127.0.0.1:4000/uploads/1716962052293-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'It’s really bad'
    },
    {
        title: 'DriverRearDoor',
        step: 11,
        images: ['http://127.0.0.1:4000/uploads/1716962090235-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'DriverRoofRail',
        step: 12,
        images: ['http://127.0.0.1:4000/uploads/1716962136717-image.jpg'],
        isCheckQuality: false,
        dentType: '1 - 5 dents',
        dentSize: 'It’s really bad'
    },
    {
        title: 'DriverFrontDoor',
        step: 13,
        images: ['http://127.0.0.1:4000/uploads/1716962183389-image.jpg'],
        isCheckQuality: false,
        dentType: '1 - 5 dents',
        dentSize: 'Dime'
    },
    {
        title: 'DriverFender',
        step: 14,
        images: ['http://127.0.0.1:4000/uploads/1716962223464-image.jpg'],
        isCheckQuality: false,
        dentType: 'NULL',
        dentSize: 'NULL'
    },
    {
        title: 'DashboardVin',
        step: 15,
        images: ['http://127.0.0.1:4000/uploads/1716962274742-image.jpg'],
        isCheckQuality: false,
        dentType: 'It’s, like, really bad (76+)',
        dentSize: 'Dime'
    },
    {
        title: 'DoorJamVIN',
        step: 16,
        images: ['http://127.0.0.1:4000/uploads/1716962308869-image.jpg'],
        isCheckQuality: false,
        dentType: '1 - 5 dents',
        dentSize: 'Dime'
    }
];
