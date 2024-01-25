import { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate, Router } from 'react-router-dom';
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import DefaultImage from '../../../public/img/default.png';
import Input from '@/components/common/Input';
import UserService from "@/services/user-service"

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Avatar redesign',
      description: 'New avatar and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}
const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Profile() {
  const navigate = useNavigate();
  const [avatarPhoto, setAvatarPhoto] = useState('');
  // const [pwdAllow, setPwdAllow] = useState(false);
  const [avatarPhotoFlag, setAvatarPhotoFlag] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
 
  const [avatarFile, setAvatarFile] = useState();
  const avatarFileRef = useRef();
  const [user, setUser] = useState({});
  // const [password, setPassword] = useState('');
  // const [confirmPwd, setConfirmpwd] = useState('');
  // const [passwordFlag, setPasswordFlag] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState('');
  const API_URL = process.env.API_URL;
  const onChangeAvatarPhoto = event => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = event => {
        setAvatarPhoto(event.target.result);
        setAvatarPhotoFlag(false);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const [isMatch, setMatch] = useState(true);
  const avatarImageClick = () => {
    avatarFileRef.current.click();
  };
  const updateUser = async () => {
    // if(pwdAllow){
    //   if (password !== confirmPassword) {
    //     setMatch(false)
    //     console.log("not match");
    //   }else{
    //     setMatch(true)
    //     setUser({
    //       ...user,
    //       password: password,
    //     })
    //     console.log(password)
    //   }
    // }
    let payload = {
      user: user,
    };
    if (avatarFile) payload.file = avatarFile;
    const response = await UserService.updateUser(payload);
    if (response.success) {
      navigate("/dashboard/home");
    }
    // let flag = true;
    // if (user.name === '') {
    //   flag = false;
    //   setErrors({
    //     ...errors,
    //     nameError: true
    //   })
    // }
    // if (user.email === '') {
    //   flag = false;
    //   setErrors({
    //     ...errors,
    //     emailError: true
    //   })
    // }
    // if (user.phone === "") {
    //   flag = false;
    //   setErrors({
    //     ...errors,
    //     phoneError: true
    //   })
    // }
    // if (!flag) {
    //   return;
    // }

    // let payload = {
    //   user: user,
    // };

    // if (avatarFile)
    //   payload.file = avatarFile


    // const response = await UserService.updateUser(payload);
    // if (response.success) {
    //   navigate("/dashboard/users");
    // }
  }
  useEffect(() => {
    async function fetchData() {
      const response = await UserService.getUser();
      setUser(response.user);
    }
    fetchData();
  }, [])


  return (
    <main>
      <header className="relative isolate pt-16">
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-6">
              <input type='file' onChange={onChangeAvatarPhoto} hidden ref={avatarFileRef} />
              <img
                src={avatarPhoto ? avatarPhoto : user.profile_image ? API_URL + '/' + user.profile_image : DefaultImage}
                alt='avatarImage'
                onClick={avatarImageClick}
                width={150}
                height={150}
                className='rounded-full'
                style={{ objectFit: 'contain' }}
              />
              <h1>
                <div className="mt-1 text-base font-semibold leading-6 text-gray-900">{user.contact_person}</div>
                <div className="text-sm leading-6 text-gray-500">
                {user.email}
                </div>
                <div className="text-sm leading-6 text-gray-500">
                  +{user.phone}
                </div>
              </h1>
            </div>

            
          </div>
        </div>
      </header>

      <div>
        <div className='px-4 pt-4 mx-auto max-w-8xl sm:px-6 lg:px-8'>
          <div>
            <div className='mt-3 sm:mt-5 '>
              <div className='flex '>
                <form className='w-full space-y-8 divide-y divide-gray-200'>
                  <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div className='pt-2'>
                      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='sm:col-span-3'>
                          <Input
                            labelName={'Company Name'}
                            value={user.name}
                            onChange={e =>
                              setUser({
                                ...user,
                                name: e.target.value,
                              })
                            }
                            maxLength={50}
                          />
                        </div>
                        {/* <div className='sm:col-span-3'>
                          <Input
                            labelName={'Last name'}
                            value={user.last_name}
                            onChange={e =>
                              setUser({
                                ...user,
                                last_name: e.target.value,
                              })
                            }
                            // error={lastNameFlag}
                            maxLength={50}
                          />
                        </div> */}
                        <div className='sm:col-span-3'>
                          <Input
                            labelName={'Email'}
                            value={user.email}
                            onChange={e =>
                              setUser({
                                ...user,
                                email: e.target.value,
                              })
                            }
                            // error={lastNameFlag}
                            maxLength={50}
                          />
                        </div>
                        {/* <div className='sm:col-span-6'>
                          <input type="checkbox" 
                          onChange = {e => {
                            setPwdAllow(e.target.checked)
                          }}
                          /> change password?
                        </div> */}
                        {/* <div className='sm:col-span-3'>
                          <Input
                            type="password"
                            labelName={'Password'}
                            value={password}
                            onChange={e => {
                              setPassword(e.target.value)
                            }}
                            maxLength={50}
                            disabled={!pwdAllow}
                          />
                          {!isMatch && <span className='text-sm text-red-400' >Password do not match</span>}
                        </div>
                        <div className='sm:col-span-3'>
                          <Input
                            type="password"
                            labelName={'Confirm'}
                            value={confirmPassword}
                            onChange={e => {
                              setConfirmPassword(e.target.value)
                            }
                            }
                            // error={lastNameFlag}
                            disabled={!pwdAllow}
                            maxLength={50}
                          />
                        </div> */}
                      </div>
                    </div>
                    <div className='flex flex-row-reverse py-3 bg-translate sm:px-0'>
                      <button
                        type='button'
                        onClick={updateUser}
                        disabled={false}
                        style={{}}
                        className={`inline-flex w-[100px] justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm sm:px-10 ${false ? 'bg-blue-200' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        {/* Invoice summary */}
        <div className="lg:col-start-3 lg:row-end-1">
          <h2 className="sr-only">Summary</h2>
          <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
            <dl className="flex flex-wrap">
              <div className="flex-auto pl-6 pt-6">
                <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
              </div>
              <div className="flex-none self-end px-6 pt-4">
                <dt className="sr-only">Status</dt>
                <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                  Paid
                </dd>
              </div>
              <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                <dt className="flex-none">
                  <span className="sr-only">Client</span>
                  <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dt className="flex-none">
                  <span className="sr-only">Due date</span>
                  <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd className="text-sm leading-6 text-gray-500">
                  <time dateTime="2023-01-31">January 31, 2023</time>
                </dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dt className="flex-none">
                  <span className="sr-only">Status</span>
                  <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
              </div>
            </dl>
            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Download receipt <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-4 sm:pb-10  xl:px-8 xl:pb-20 xl:pt-8">
        <table className=" w-full whitespace-nowrap text-left text-sm leading-6">
          <colgroup>
            <col className="w-full" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="border-b border-gray-200 text-gray-900">
            <tr>
              <th scope="col" className="px-0 py-3 font-semibold">
                Order
              </th>
              <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                Hours
              </th>
              <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                Rate
              </th>
              <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="max-w-0 px-0 py-5 align-top">
                  <div className="truncate font-medium text-gray-900">{item.title}</div>
                  <div className="truncate text-gray-500">{item.description}</div>
                </td>
                <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                  {item.hours}
                </td>
                <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                  {item.rate}
                </td>
                <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */}
    </main >
  );
}

export default Profile;
