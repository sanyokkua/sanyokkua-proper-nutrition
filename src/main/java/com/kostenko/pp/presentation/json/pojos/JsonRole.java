package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JsonRole {
    private Long roleId;
    private String roleName;

    public static JsonRole mapFrom(Role role){
        return JsonRole.builder().roleId(role.getRoleId()).roleName(role.getRoleName()).build();
    }

    public Role mapTo(){
        return Role.builder().roleId(this.roleId).roleName(this.roleName).build();
    }
}

