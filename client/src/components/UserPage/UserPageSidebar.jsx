import UilHospital from '@iconscout/react-unicons/icons/uil-hospital'

const UserPageSidebar = ({pageUserData}) => {
  return (
    <div>
      <div>
          <UilHospital size={25}/>
          <div>Created {dateUtils.getFullDateFormat(pageUserData._createdOn)}</div>
      </div>
    </div>
  )
}

export default UserPageSidebar
