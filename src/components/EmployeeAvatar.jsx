function EmployeeAvatar({ firstName, lastName }) {

    const initials =
        `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;

    return (

        <div className="employee-info">

            <div className="employee-avatar">

                {initials.toUpperCase()}

            </div>

            <div>

                <div className="employee-name">

                    {firstName} {lastName}

                </div>

            </div>

        </div>

    );

}

export default EmployeeAvatar;