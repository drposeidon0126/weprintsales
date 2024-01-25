
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import Content from './components/content';
import { useEffect, useState } from "react";
import UserService from "@/services/user-service"
export function Users() {
  const [searchTxt, setSearchTxt] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterItem, setFilterItem] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false)
  const editItem = id => {
  };

  const deleteComfirm = props => {
  };
  const setFilter = value => {
  };

  useEffect(() => {
    async function fetchData() {
      const response = await UserService.getUserList();
      setUsers(response.entities);
    }
    fetchData();
  }, [])

  return (
    <div className=" flex flex-col gap-5">
      <div>
        {/* <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader> */}
        <div className='mt-5'>
          <Content
            users={users}
            editFunction={editItem}
            deleteFunction={deleteComfirm}
            searchTxt={searchTxt}
            setSearchTxt={setSearchTxt}
            setFilter={setFilter}
            filterItems={filterItem}
            selectedFilter={filterValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
