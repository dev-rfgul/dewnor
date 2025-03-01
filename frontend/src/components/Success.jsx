// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';

// const PaymentStatus = () => {
//     const location = useLocation();
//     const isSuccess = location.pathname.includes('success');

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
//                 {isSuccess ? (
//                     <>
//                         <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
//                         <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful</h2>
//                         <p className="text-gray-600 mt-2">Thank you for your purchase! Your order is confirmed.</p>
//                     </>
//                 ) : (
//                     <>
//                         <FaTimesCircle className="text-red-500 w-16 h-16 mx-auto" />
//                         <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Failed</h2>
//                         <p className="text-gray-600 mt-2">Something went wrong. Please try again.</p>
//                     </>
//                 )}
//                 <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
//                     Back to Home
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default PaymentStatus;


import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SuccessPayment = () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
            <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful</h2>
            <p className="text-gray-600 mt-2">Thank you for your purchase! Your order is confirmed.</p>
            <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
                Back to Home
            </Link>
        </div>
    </div>
);

const CancelPayment = () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
            <FaTimesCircle className="text-red-500 w-16 h-16 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Canceled</h2>
            <p className="text-gray-600 mt-2">Your payment was canceled. You can try again later.</p>
            <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
                Back to Home
            </Link>
        </div>
    </div>
);

export { SuccessPayment, CancelPayment };
