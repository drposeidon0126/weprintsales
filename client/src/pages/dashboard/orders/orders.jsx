
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import Content from '@/pages/dashboard/orders/components/content';
import { useEffect, useState } from "react";
import OrderService from "@/services/order-service";
import UserService from "@/services/user-service";
import ConfirmModal from "@/components/common/comfirmModal";
export function Orders() {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterItem, setFilterItem] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [isDelete, setIsDelete] = useState(false);


  const editItem = id => {
  };

  async function getCurrentUser() {

    const response = await UserService.getUser();
    setUser(response.user)

  }
  useEffect(() => {
    setRole(localStorage.getItem('role'))
    getCurrentUser();
  }, [])

  const deleteComfirm = props => {
    setSelectedOrderId(props.id);
    setConfirmMessage("Are you going to precess this action");
    setIsConfirm(true);
  };
  const setFilter = value => {
  };

  const handleClose = () => {
    setIsConfirm(false);
  }
  const controlAction = async () => {
    const response = await OrderService.deleteOrder(selectedOrderId);
    console.log(response.state, "deleted")
    if (response.state) {
      setIsDelete(true);
    }
    setIsConfirm(false);
  }
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const setSearchTxt = (value) => {
    console.log(value, 'valude');
    setSearch(value);
    fetchData(value);
  }
  useEffect(() => {
    if (user._id !== undefined) {
      console.log("this is fect")
      fetchData('');
    }
  }, [user._id]);

  useEffect(() => {
    if (user._id !== undefined) {
      console.log("this is fect")
      fetchData('');
    }
  }, [isDelete]);
  async function fetchData(search) {
    const query = {
      page: currentPage - 1,
      perPage: perPage,
      search: search,
    };


    if (user.role === "admin") {
      console.log("this is admin")
      setLoadingData(true);
      const response = await OrderService.getOrderList(query);
      setOrders(response.docs);
      setTotalPages(response.totalPages);
      setTotal(response.totalDocs);
      setCurrentPage(response.page);
      setLoadingData(false);


    } else if (user.role === "normal") {
      console.log("this is normal")

      setLoadingData(true);
      const response = await OrderService.getOrderListByUserId(query, user._id);
      setOrders(response.orders);
      setTotalPages(response.totalPages);
      setTotal(response.orders.length);
      setCurrentPage(response.currentPage);
      setLoadingData(false);

    } else if (user.role === "artworker") {
      console.log("this is artworker")

      setLoadingData(true);
      const response = await OrderService.getOderListByApprove(query);
      setOrders(response.docs);
      setTotalPages(response.totalPages);
      setTotal(response.totalDocs);
      setCurrentPage(response.page);
      setLoadingData(false);

    } else if (user.role === "projectstuff") {

      setLoadingData(true);
      const response = await OrderService.getOderListByComplete(query);
      setOrders(response.docs);
      setTotalPages(response.totalPages);
      setTotal(response.totalDocs);
      setCurrentPage(response.page);
      setLoadingData(false);
    }
  }
  return (
    <div className=" flex flex-col gap-5">
      <div>
        {/* <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader> */}
        <div className="mt-5">
          <Content
            loadingData={loadingData}
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            perPage={perPage}
            onPageChange={onPageChange}
            orders={orders}
            editFunction={editItem}
            deleteFunction={deleteComfirm}
            searchTxt={search}
            setSearchTxt={setSearchTxt}
            setFilter={setFilter}
            filterItems={filterItem}
            selectedFilter={filterValue}
          />
        </div>
      </div>
      <ConfirmModal
        open={isConfirm}
        deleteItem={controlAction}
        handleClose={handleClose}
        message={confirmMessage}
      />
    </div>
  );
}

export default Orders;
