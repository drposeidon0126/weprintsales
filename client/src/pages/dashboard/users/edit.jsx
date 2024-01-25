/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Input from '@/components/common/Input';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from 'react';
import DefaultImage from '../../../../public/img/default.png';
import UserService from "@/services/user-service"
import { SelectNoSearch } from '@/components/common/Select';
import { useParams } from 'react-router-dom';
import { useNavigate, Router } from 'react-router-dom';
const userTypeList = [
  { id: 0, name: "normal" },
  { id: 1, name: "admin" },
  { id: 2, name: "artworker" },
  { id: 3, name: "projectstuff" },


];
const statusList = [
  { id: 0, name: "request" },
  { id: 1, name: "permit" }
]
const userRoleList = [
  { id: 0, name: "Admin" },
  { id: 1, name: "Sales Manager" },
  { id: 2, name: "Artwork Manager" },
  { id: 3, name: "Artwork Team Member" },
  { id: 3, name: "Production Manager" },
];
export function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avatarFile, setAvatarFile] = useState();
  const avatarFileRef = useRef();
  const [avatarPhoto, setAvatarPhoto] = useState('');
  const API_URL = process.env.API_URL;
  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_image: "",
    contact_person: "",
    company_name: "",
    role: "",
    user_status: "",
    phone: "",
    address: "",
    reseller_id: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    contactPersonError: false,
    phoneError: false,
    addressError: false,
    resellerIdError: false,
    agreeError: false,
    error: false,
  });

  const onChangeAvatarPhoto = event => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = event => {
        setAvatarPhoto(event.target.result);
        // setUser({
        //   ...user,
        //   profile_image: event.target.result
        // })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const avatarImageClick = () => {
    avatarFileRef.current.click();
  };

  const updateUser = async () => {
    let flag = true;
    if (user.name === '') {
      flag = false;
      setErrors({
        ...errors,
        nameError: true
      })
    }
    if (user.email === '') {
      flag = false;
      setErrors({
        ...errors,
        emailError: true
      })
    }
    if (user.phone === "") {
      flag = false;
      setErrors({
        ...errors,
        phoneError: true
      })
    }
    if (!flag) {
      return;
    }
  
    let payload = {
      user: user,
    };
  
    if (avatarFile)
      payload.file = avatarFile
    const response = await UserService.updateUser(payload);
    if (response.success) {
      if (user.user_status === 'permit') {
        const messageData = {
          from: 'calvin168943@gmail.com',
          to: 'calvin168943@gmail.com',
          // to: user.email,
          subject: 'Hello ' + user.name + '.',
          text: 'You are approved!'
        };
        const email_response = await UserService.sendEmail(messageData);
        console.log("this is my msg.")
        console.log(email_response, 'email response')
        navigate("/dashboard/users");
  
      } else {
        const messageData = {
          from: 'calvin168943@gmail.com',
          to: 'calvin168943@gmail.com',
          // to: user.email,
          subject: 'Hello ' + user.name + '.',
          text: 'Your are pending!'
        };
        const email_response = await UserService.sendEmail(messageData);
        console.log("this is my msg.")
        console.log(email_response, 'email response')
        navigate("/dashboard/users");
      }
    }
    navigate("/dashboard/users");

  }
  useEffect(() => {
    async function fetchData() {
      const response = await UserService.getUserById(id);
      setUser(response.user);
      //if (response.user.profile_image)
      //setAvatarPhoto(response.user.profile_image)
    }
    if (id)
      fetchData();
  }, [])

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div> */}

            <div className="col-span-full">
              <div className="flex items-center gap-x-6">
                <input
                  type="file"
                  onChange={onChangeAvatarPhoto}
                  hidden
                  ref={avatarFileRef}
                />
                <img
                  src={
                    avatarPhoto
                      ? avatarPhoto
                      : user.profile_image
                        ? API_URL + "/" + user.profile_image
                        : DefaultImage
                  }
                  alt="avatarImage"
                  onClick={avatarImageClick}
                  width={150}
                  height={150}
                  className="rounded-full"
                  style={{ objectFit: "contain" }}
                />

                <h1>
                  <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                    {user.contact_person}
                  </div>
                  <div className="text-sm leading-6 text-gray-500">
                    {user.email}<span className="text-gray-700"></span>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                labelName={"Name"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                value={user.name}
                error={errors.name}
                maxLength={50}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                labelName={"Company name"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    company_name: e.target.value,
                  })
                }
                value={user.company_name}
                error={errors.company_name}
                maxLength={50}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                labelName={"Email"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                value={user.email}
                error={errors.email}
                maxLength={50}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                labelName={"Phone"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
                value={user.phone}
                error={errors.phone}
                maxLength={50}
              />
            </div>

            <div className="col-span-full">
              <Input
                labelName={"Street address"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: e.target.value,
                  })
                }
                value={user.address}
                error={errors.address}
                maxLength={50}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectNoSearch
                labelName={"User Type"}
                onChange={(item) => {
                  setUser({
                    ...user,
                    role: item.name,
                  });
                }}
                value={user.role}
                items={userTypeList}
                isStatus={true}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectNoSearch
                labelName={"User Status"}
                onChange={(item) => {
                  setUser({
                    ...user,
                    user_status: item.name,
                  });
                }}
                value={user.user_status}
                items={statusList}
                isStatus={true}
              />
            </div>

            {/* <div className="sm:col-span-3">
              <SelectNoSearch
                labelName={"User Status"}
                onChange={(item) => {
                  setUser({
                    ...user,
                    role: item.name,
                  });
                }}
                value={user.role}
                items={userRoleList}
                isStatus={true}
              />
            </div> */}

            <div className="sm:col-span-3 sm:col-start-1">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Is Tax Exempt
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Orders</h2>
          <div className="mt-10 space-y-10">
            <table className='min-w-full border-t divide-y divide-gray-300 sm:border  rounded-md'>
              <thead className={`bg-blue-400 text-white`}>
                <tr>
                  <th scope='col' className='py-3.5 pl-4 text-left text-sm font-semibold  sm:pl-4'>
                    Name
                  </th>
                  <th scope='col' className='px-2 py-3.5 text-left text-sm font-semibold '>
                    Email
                  </th>
                  <th scope='col' className='px-2 py-3.5 text-left text-sm font-semibold '>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200  !border-b !border-gray-200'>
                {[0, 1].map((user, index) => (
                  <tr key={index}>
                    <td className='w-full px-1 py-4 pl-4 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none'>
                      <dl className='font-medium'>
                        <dt className='sr-only'>Name</dt>
                        <dd className='mt-1 text-[15px] text-gray-700 truncate'>
                          {user.name}
                        </dd>
                      </dl>
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {user.email}
                    </td>
                    <td className='px-3 py-4 text-sm text-gray-800 whitespace-nowrap'>
                      {user.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={updateUser}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default UserEdit;