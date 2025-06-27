import React, { useState } from 'react';

const FAQ = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <section className="bg-base-100 py-14 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-[#03373D]">Frequently Asked Questions (FAQ)</h2>
                <p className="text-gray-500 mb-10">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment,
                    reduce pain, and strengthen your body with ease!
                </p>

                <div className="space-y-4 text-left">
                    {/* FAQ 1 */}
                    <div className="collapse collapse-arrow bg-[#E6F2F3]  shadow-3xl shadow-3xl rounded-box border border-[#067A87]">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div
                            className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87] "
                        >
                            How does this posture corrector work?
                        </div>
                        <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                            A posture corrector works by gently aligning your shoulders and spine...
                        </div>
                    </div>

                    {/* FAQ 2 */}
                    <div className="collapse collapse-arrow bg-[#E6F2F3]  shadow-3xl shadow-3xl rounded-box">
                        <input type="radio" name="faq-accordion" />
                        <div
                            className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87]"
                        >
                            Is it suitable for all ages and body types?
                        </div>
                        <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                            Yes! Posture Pro is adjustable and designed to fit most body types...
                        </div>
                    </div>

                    {/* FAQ 3 */}
                    <div className="collapse collapse-arrow bg-[#E6F2F3] shadow-3xl shadow-3xl rounded-box">
                        <input type="radio" name="faq-accordion" />
                        <div
                            className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87]"
                        >
                            Does it really help with back pain and posture improvement?
                        </div>
                        <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                            Absolutely. Regular use of Posture Pro can significantly improve your posture...
                        </div>
                    </div>

                    {/* FAQ 4 */}
                    <div className="collapse collapse-arrow bg-[#E6F2F3] shadow-3xl shadow-3xl rounded-box">
                        <input type="radio" name="faq-accordion" />
                        <div
                            className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87]"
                        >
                            Does it have smart features like vibration alerts?
                        </div>
                        <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                            Yes! Posture Pro features smart vibration technology...
                        </div>
                    </div>

                    {/* Conditional FAQs */}
                    {showMore && (
                        <>
                            {/* FAQ 5 */}
                            <div className="collapse collapse-arrow bg-[#E6F2F3]   shadow-3xl rounded-box">
                                <input type="radio" name="faq-accordion" />
                                <div
                                    className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87]"
                                >
                                    How will I be notified when the product is back in stock?
                                </div>
                                <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                                    You can sign up with your email on our product page...
                                </div>
                            </div>

                            {/* FAQ 6 */}
                            <div className="collapse collapse-arrow bg-[#E6F2F3] shadow-4xl rounded-box">
                                <input type="radio" name="faq-accordion" />
                                <div
                                    className="collapse-title font-semibold text-lg text-[#03373D] border-b border-dashed border-[#067A87]"
                                >
                                    Can I wear it under clothing throughout the day?
                                </div>
                                <div className="collapse-content text-sm text-gray-700 leading-relaxed">
                                    Yes, the design is slim and discreet. You can wear it under most outfits comfortably.
                                </div>
                            </div>
                        </>
                    )}

                    {/* Toggle Button */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="btn text-black btn-primary"
                        >
                            {showMore ? 'Show Less FAQs' : 'See More FAQs'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
