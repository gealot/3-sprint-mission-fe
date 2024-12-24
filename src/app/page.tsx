import { HomePage } from '@/pages/home';
// import { ky } from '@lib/middlewares/kyWrapper';

const Home = async () => {
  // const fetchTest = async () => {
  //   const response = await ky(`/users/me`, {
  //     method: 'GET',
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }
  // console.log(await fetchTest());
  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
