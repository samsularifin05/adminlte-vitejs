import { useForm } from "react-hook-form";
import { Button, Col, InputField, Row } from "../../../../components";
import { defaultvalueUser, validatorDataUser } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { dataUserStore, modalShow } from "../../../../recoil";
import { useRecoilValue } from "recoil";

const FormDataUser = () => {
  const userdata = dataUserStore();
  const getDataModal = useRecoilValue(modalShow);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields  },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validatorDataUser),
    defaultValues: defaultvalueUser,
  });

  console.log(isDirty, dirtyFields)
  const onSubmit = async (data: any) => {
    let rowDataPost = {
      nama_lengkap: data.nama_lengkap,
      username: data.username,
      role: "ADMIN",
      level: data.level,
      email: data.email,
      password: data.password,
      c_password: getDataModal.isEdit ? data.password : data.c_password,
    };
    console.log(rowDataPost)
    userdata.simpanDataUser(rowDataPost);
  };

  const [password, setPassword] = useState(true);
  const [c_password, setCPassword] = useState(true);

  useEffect(() => {
    if (getDataModal.isEdit) {
      let data = getDataModal.data;
      reset({
        id: data.id,
        nama_lengkap: data.nama_lengkap,
        username: data.username,
        level: data.level,
        email: data.email,
      });
    } else {
      reset(defaultvalueUser);
    }
  }, [getDataModal]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <InputField
          type="hidden"
          readOnly={getDataModal.isEdit}
          {...register("id")}
          errors={errors?.id}
        />
        <InputField
          type="hidden"
          readOnly={getDataModal.isEdit}
          {...register("password_old")}
          errors={errors?.password_old}
        />
        <Col size="6">
          <InputField
            label="Username"
            type="text"
            readOnly={getDataModal.isEdit}
            {...register("username")}
            errors={errors?.username}
            placeholder="Silahkan Masukan Username"
          />
        </Col>
        <Col size="6">
          <InputField
            label="Email"
            type="email"
            readOnly={getDataModal.isEdit}
            {...register("email")}
            errors={errors?.email}
            placeholder="Silahkan Masukan Email"
          />
        </Col>
        <Col size="6">
          <InputField
            label="Level"
            type="text"
            {...register("level")}
            errors={errors?.level}
            placeholder="Silahkan Masukan Level"
          />
        </Col>
        <Col size="6">
          <InputField
            label="Nama Lengkap"
            type="text"
            {...register("nama_lengkap")}
            errors={errors?.nama_lengkap}
            placeholder="Silahkan Masukan Nama Lengkap"
          />
        </Col>
        <Col size="6">
          <InputField
            label="Password"
            {...register("password")}
            name="password"
            type="text"
            formGroup
            iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
            customeCss={password ? "password-hide-css" : ""}
            btnAction={() => setPassword(!password)}
            placeholder="Silahkan Masukan Passwsord"
            errors={errors?.password}
          />
        </Col>
        <Col size="6">
          <InputField
            label="Ulangi Password"
            {...register("c_password")}
            name="c_password"
            type="text"
            formGroup
            placeholder="Silahkan Ulangi Passwsord"
            iconFormGroup={c_password ? "fas fa-eye-slash" : "fas fa-eye"}
            customeCss={c_password ? "password-hide-css" : ""}
            btnAction={() => setCPassword(!c_password)}
            errors={errors?.c_password}
          />
        </Col>
        <Col size="12">
          <Button
            disabled={!isDirty}
            title="Simpan Data"
            type="submit"
            color="primary"
            block
          />
        </Col>
      </Row>
    </form>
  );
};

export default FormDataUser;
