import DashboardLayout from "@/layouts/DashboardLayout";
import { useUser } from "@/utils/contexts/useUser";
import withPageAuthRequired from "@/utils/withPageAuthRequired";

const Page = () => {
  const { isLoading, user } = useUser();
  console.log(isLoading, user);
  return (
    <DashboardLayout
      page='setup'
      heading='Channel name'
      description='Description of the youtube channel goes here'
    >
      {isLoading}
    </DashboardLayout>
  );
};

export default withPageAuthRequired(Page);
