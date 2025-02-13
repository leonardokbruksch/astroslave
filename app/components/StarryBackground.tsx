import React from 'react';
import { StarField } from 'starfield-react'

export default function StarryBackground() {
    return (
        <div className="fixed inset-0 z-0">
            <StarField
                count={1000}
                speed={1}
                starSize={0.2}
                starRatio={10}
                fps={12}
                starShape="round"
                bgStyle="rgb(10, 10, 31)"
                starStyle={() => `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`}
            />
        </div>
    );
}
