import './LoadingIndicator.scss';

export function LoadingIndicator() {
    return (
        <div className="page">
            <div className="page__container">
                <div className="page__content">
                    <div className="ring">Loading
                        <span className="indicator"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

