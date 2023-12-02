import { useContext } from "react";
import { ConfigContext } from "@stores/config";
import Container from "@components/Container";
import Select from "@components/Select";
import Input from "@components/Input";
import Checkbox from "@components/Checkbox";

export default function Information() {
    const { config, setConfig } = useContext(ConfigContext);

    const values = [config.database.type];
    if (!["", "sqlite"].includes(config.database.type)) values.push(config.database.username);
    if (config.database.password.enabled) values.push(config.database.password.value);

    config.canGoForward = values.every(value => value !== "");
    setConfig(config);

    return (
        <>
            <Container header={{
                big: "Database",
                small: <>
                    Blacket uses a SQL type database to store information such as users, blooks, packs, and more. You must enter your database credentials below. All fields marked with a (*) are required.
                </>
            }}>

                <Select options={[{
                    value: "",
                    text: "Database Type (*)"
                }, {
                    value: "mysql",
                    text: "MySQL"
                }, {
                    value: "sqlite",
                    text: "SQLite"
                }, {
                    value: "mariadb",
                    text: "MariaDB"
                }, {
                    value: "postgres",
                    text: "PostgreSQL"
                }, {
                    value: "mssql",
                    text: "Microsoft SQL Server"
                }, {
                    value: "oracle",
                    text: "Oracle Database"
                }]} value={config.database.type} onChange={(e) => {
                    config.database.type = e.target.value;
                    setConfig({ ...config });
                }} />

                {!["", "sqlite"].includes(config.database.type) && <>
                    <Input icon="fas fa-cloud" placeholder="Database Host" help={<>
                        The host of the database. If you don't specify a host, <code>localhost</code> will be used.
                    </>} onChange={(e) => {
                        config.database.host = e.target.value;
                        setConfig({ ...config });
                    }} value={config.database.host || ""} />

                    <Input icon="fas fa-colon" placeholder="Database Port" help={<>
                        The port of the database. If you don't specify a port, the default port for the database will be used.
                    </>} onChange={(e) => {
                        config.database.port = e.target.value;
                        setConfig({ ...config });
                    }} value={config.database.port || ""} />

                    <Input icon="fas fa-signature" placeholder="Database Name" help={<>
                        The name of the database. If you don't specify a name, <code>blacket</code> will be used.
                    </>} onChange={(e) => {
                        config.database.name = e.target.value;
                        setConfig({ ...config });
                    }} value={config.database.name || ""} />

                    <Input icon="fas fa-user" placeholder="Database Username (*)" help={<>
                        The username of the user to use for the database. This user must have access to the database.
                    </>} onChange={(e) => {
                        config.database.username = e.target.value;
                        setConfig({ ...config });
                    }} value={config.database.username || ""} />

                    <Checkbox checked={config.database.password.enabled} onClick={() => {
                        config.database.password.enabled = !config.database.password.enabled;
                        setConfig({ ...config });
                    }}>
                        Use Database Password
                    </Checkbox>

                    {config.database.password.enabled && <Input icon="fas fa-key" placeholder="Database Password (*)" help={<>
                        The password of the user.
                    </>} onChange={(e) => {
                        config.database.password.value = e.target.value;
                        setConfig({ ...config });
                    }} type="password" value={config.database.password.value || ""} />}
                </>}

            </Container>
        </>
    )
}