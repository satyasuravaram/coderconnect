// import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

// export default class SkillsDropdown extends Component {

//     render() {
      
//         return (
//             <div>
//                 <Select
//                 options={this.props.options}
//                 defaultValue={this.props.existingSkills}
//                 onChange={this.props.setExistingSkills}
//                 components={makeAnimated()}
//                 isMulti
//               />
//             </div>
//         )
//     }
// }

import React from 'react'

export const SkillsDropdown = (props) => {
    return (
        <div>
                <Select
                options={props.options}
                defaultValue={props.existingSkills}
                onChange={props.setExistingSkills}
                components={makeAnimated()}
                isMulti
              />
        </div>
    )
}

export default SkillsDropdown;
