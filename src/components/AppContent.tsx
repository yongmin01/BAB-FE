import Footer from '@components/Footer/Footer'
import BusinessDocUpload from '@pages/BusinessDocUpload/BusinessDocUpload'
import DiscountEventPage from '@pages/DiscountEventPage/DiscountEventPage/DiscountEventPage'
import DiscountEventPageTwo from '@pages/DiscountEventPage/DiscountEventPageTwo/DiscountEventPageTwo'
import DiscountEventRecordPage from '@pages/DiscountEventRecordPage/DiscountEventRecordPage'
import DiscountRestaurantListPage from '@pages/DiscountRestaurantListPage/DiscountRestaurantListPage'
import EditFirstRegisterStoreInfo from '@pages/FirstRegisterStoreInfo/EditFirstRegisterStoreInfo'
import FirstRegisterStoreInfo from '@pages/FirstRegisterStoreInfo/FirstRegisterStoreInfo'
import ManagerPage from '@pages/ManagerPage/ManagerPage'
import MapRender from '@pages/MapPage/MapRender'
import MemberType from '@pages/MemberType/MemberType'
import OAuth from '@pages/OAuth/OAuth'
import EditSuccess from '@pages/RegisterSuccess/EditSuccess'
import RegisterStoreSuccess from '@pages/RegisterSuccess/RegisterStoreSuccess'
import RegisterSuccess from '@pages/RegisterSuccess/RegisterSuccess'
import SchoolSearchPage from '@pages/SchoolSearchPage/SchoolSearchPage'
import EditSecondRegisterStoreInfo from '@pages/SecondRegisterStoreInfo/EditSecondRegisterStoreInfo'
import SecondRegisterStoreInfo from '@pages/SecondRegisterStoreInfo/SecondRegisterStoreInfo'
import ShopDetail from '@pages/ShopDetail/ShopDetail'
import Signup from '@pages/Signup/Signup'
import Splash from '@pages/Splash/Splash'
import StoreInfoDeletePage from '@pages/StoreInfoDeletePage/StoreInfoDeletePage'
import StoreInfoEditPage from '@pages/StoreInfoEditPage/StoreInfoEditPage'
import StudentPage from '@pages/StudentPage/StudentPage'
import EditThirdRegisterStoreInfo from '@pages/ThirdRegisterStoreInfo/EditThirdRegisterStoreInfo'
import ThirdRegisterStoreInfo from '@pages/ThirdRegisterStoreInfo/ThirdRegisterStoreInfo'
import TodayDiscountRestaurantPage from '@pages/TodayDiscountRestaurantPage/TodayDiscountRestaurantPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import UploadSuccess from './UploadSuccess/UploadSuccess'

export default function AppContent() {
  const location = useLocation()
  const showFooter =
    location.pathname === '/manager' ||
    location.pathname === '/studentPage' ||
    location.pathname === '/list' ||
    location.pathname === '/mapPage'
  return (
    <>
      {/* <StatusBar /> */}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/memberType" element={<MemberType />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="/shopdetail" element={<ShopDetail />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/discount-event" element={<DiscountEventPage />} />
        <Route path="/discount-eventTwo" element={<DiscountEventPageTwo />} />
        <Route path="/discount-record" element={<DiscountEventRecordPage />} />
        <Route path="/storeInfo-edit" element={<StoreInfoEditPage />} />
        <Route path="/storeInfo-delete" element={<StoreInfoDeletePage />} />
        <Route path="/studentPage" element={<StudentPage />} />
        <Route path="/mapPage" element={<MapRender />} />
        <Route path="/schoolSearch" element={<SchoolSearchPage />} />
        <Route
          path="/todayDiscountRestaurant"
          element={<TodayDiscountRestaurantPage />}
        />
        <Route path="/list" element={<DiscountRestaurantListPage />} />
        <Route
          path="/firstregisterstoreinfo"
          element={<FirstRegisterStoreInfo />}
        />
        <Route
          path="/secondregisterstoreinfo"
          element={<SecondRegisterStoreInfo />}
        />
        <Route
          path="/thirdregisterstoreinfo"
          element={<ThirdRegisterStoreInfo />}
        />
        <Route
          path="/editfirstregisterstoreinfo"
          element={<EditFirstRegisterStoreInfo />}
        />
        <Route
          path="/editsecondregisterstoreinfo"
          element={<EditSecondRegisterStoreInfo />}
        />
        <Route
          path="/editthirdregisterstoreinfo"
          element={<EditThirdRegisterStoreInfo />}
        />
        <Route
          path="/registerstoresuccess"
          element={<RegisterStoreSuccess />}
        />
        <Route path="/registerSuccess" element={<RegisterSuccess />} />
        <Route path="/businessdocupload" element={<BusinessDocUpload />} />
        <Route
          path="/uploadSuccess"
          element={<UploadSuccess retry={() => {}} />}
        />
        <Route path="/managerUpload" element={<BusinessDocUpload />} />
        <Route path="/editsuccess" element={<EditSuccess />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}
