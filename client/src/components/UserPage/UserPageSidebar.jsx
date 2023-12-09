import UilHospital from '@iconscout/react-unicons/icons/uil-hospital'
import { getFullDateFormat } from '../../utils/dateUtils'
import styles from './styles/UserPageSidebar.module.css'

const UserPageSidebar = ({pageUserData,isOwner}) => {

  return (
    <div>
      <div>
        u/{pageUserData.username}
      </div>
      <div className={styles['date-c']}>
          <UilHospital size={25}/>
          <div>Created {getFullDateFormat(pageUserData._createdOn)}</div>
      </div>
    </div>
  )
}

export default UserPageSidebar
