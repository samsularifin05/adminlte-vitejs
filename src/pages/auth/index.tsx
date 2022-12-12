import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  Col,
  Row,
  Button,
  InputField,
  postData,
  NotifEror,
  setItem,
} from "../../components";
import { isLoading, themesSetting } from "../../recoil";

interface Props {
  history: any;
}
const Login: React.FC<Props> = (props) => {
  const setTheme = useSetRecoilState(themesSetting);
  const setLoading = useSetRecoilState(isLoading);

  useEffect(() => {
    setTheme({
      header: false,
      sidebar: false,
      footer: false,
      content: true,
    });
    return () => {
      setTheme({
        header: true,
        sidebar: true,
        footer: true,
        content: true,
      });
    };
  }, [setTheme]);

  const {
    register,
    handleSubmit,
    // setValue,
    // disabled,
    formState: { errors,isSubmitting, isDirty, isValid  },
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoading({ content: true, button: true });
    try {
      let result: any = await postData("login", data);
      setItem("userdata", result?.data);
      setLoading({ content: false, button: false });
      props.history.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      NotifEror(error.message || error);
      setLoading({ content: false, button: false });
    }
  };

  // const hitung = (e:any) => {
  //   // console.log(e)
  //   setValue('password',e + 'sam')
  // }
  return (
    <div className="login-box container" style={{ marginTop: "10%" }}>
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <div className="h1">
            <b>ADMIN LTE </b>APP
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="login-box-msg">Sign in to start your session</p>

            <InputField
              label="Username"
              type="text"
              {...register("username", {
                required: "Email Tidak Boleh Kosong",
                // onChange: (e) => hitung(e.target.value)
              })}
              iconFormGroup="fas fa-envelope"
              formGroup
              errors={errors?.username}
              placeholder="Silahkan Masukan Userid"
            />
            <InputField
              label="Password"
              {...register("password", {
                required: "Password Tidak Boleh Kosong",
              })}
              name="password"
              type="text"
              customeCss="password-hide-css"
              placeholder="Silahkan Masukan Passwsord"
              iconFormGroup="fas fa-lock"
              formGroup
              errors={errors?.password}
            />
            <Row>
              <Col size="12">
                <Button
                disabled={!isDirty || !isValid}
                  loading
                  textLoading="Waiting"
                  type="submit"
                  color="primary"
                  block
                  title="Sign In"
                />
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
