import UilHospital from '@iconscout/react-unicons/icons/uil-hospital'
import { getFullDateFormat } from '../utils/dateUtils'

const UserPageSidebar = ({pageUserData,isOwner}) => {
  return (
    <div>
      <div>
          <UilHospital size={25}/>
          <div>Created {getFullDateFormat(pageUserData._createdOn)}</div>
      </div>
    </div>
  )
}

export default UserPageSidebar
