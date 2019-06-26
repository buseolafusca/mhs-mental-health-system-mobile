import React from 'react';
import ReactDOM from 'react-dom';
import './sass/app.scss';

class ResourcesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div class="nhsuk-expander-group">
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        Local Gyms
                    </span>
                    </summary>
                </details>
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        Parks
                    </span>
                    </summary>
                </details>
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        Interest Groups
                    </span>
                    </summary>
                </details>
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        Social Groups
                    </span>
                    </summary>
                </details>
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        Hobby Groups
                    </span>
                    </summary>
                </details>
                

</div>
        );
    }

}

export default ResourcesPage;