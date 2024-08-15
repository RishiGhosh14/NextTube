import { type NextPage } from "next";
import Head from "next/head";
import { Layout } from "~/Components/Components";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Button from "~/Components/Buttons/Button";
const Help: NextPage = () => {
  const faqs = [
    {
      question: "How Do I Create a NextTube Account?",
      answer:
        "Creating a NextTube account is simple. Click on the 'Sign Up' button on the NextTube homepage. You'll need to enter your email, create a password, and fill out other details like your name. After you've filled out the necessary fields, click 'Submit'. You'll receive an email confirmation link. Once you click the link, your account is set up!",
    },
    {
      question: "How Do I Upload a Video?",
      answer:
        "Uploading a video on NextTube is straightforward. After logging into your account, click on the 'Upload' button located on the top-right corner of the screen. Select the video you wish to upload from your device. You can then add a title, description, and tags for your video. After finalizing the details, click 'Publish'. Please note, the time taken to upload a video depends on its file size and your internet speed.",
    },
    {
      question: "How Do I Edit My Profile?",
      answer:
        "To edit your NextTube profile, go to your account by clicking on your profile icon located in the top-right corner of the screen. In the dropdown menu, click 'My Channel'. Here you can change your profile picture, channel description, and other settings. Remember to save your changes before leaving the page!",
    },
    {
      question: "Can I Download Videos from NextTube?",
      answer:
        "While NextTube doesn't support direct video downloading due to copyright protection, users have the option to save videos offline within the NextTube app. Please respect the copyrights of video owners.",
    },
    {
      question: "Is NextTube Free to Use?",
      answer:
        "Yes, NextTube is free to use! We also offer NextTube Premium, a subscription service with additional features such as ad-free viewing, background play, and access to exclusive content.",
    },
    {
      question: "How Does NextTube Handle Privacy and Security?",
      answer:
        "At NextTube, user privacy and data security are top priorities. We have robust policies and measures in place to ensure the protection of user data. For detailed information, please refer to our Privacy Policy.",
    },
    {
      question: "How Do I Report Inappropriate Content or a Violation?",
      answer:
        "If you come across content that you believe violates our Community Guidelines, you can report it using the 'Report' button underneath the video player. Our team reviews reported content and takes necessary actions.",
    },
    {
      question: "How Can I Monetize My NextTube Channel?",
      answer:
        "NextTube offers a Partner Program, which allows you to earn revenue from ads displayed on your videos and from NextTube Premium subscribers watching your content. To be eligible for the Partner Program, your channel needs to meet certain criteria including a minimum number of subscribers and watch hours.",
    },
    {
      question: "What Types of Videos Are Prohibited on NextTube?",
      answer:
        "NextTube does not allow content that is illegal, harmful, threatening, abusive, defamatory, or violates our Community Guidelines. Please refer to our Community Guidelines for more detailed information.",
    },
    {
      question: "What is NextTube's Policy on Copyright?",
      answer:
        "We respect the copyright of all creators and have zero tolerance for copyright infringement. If you believe your copyrighted work has been used on NextTube without your permission, you can file a copyright infringement notice.",
    },
  ];

  return (
    <>
      <Head>
        <title>Help - NextChat </title>
        <meta
          name="description"
          content="Official Vidchill Help Center where you can find tips and tutorials on using Vidchill and other answers to frequently asked questions."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-3xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary">
              FAQ
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-6xl">
              We’re here to help{" "}
            </h1>
            <p className="mb-4 mt-6  text-lg leading-8 text-secondary">
              Have questions? We’re here to help.
            </p>
            <Button
              className="mt-6"
              variant="primary"
              size="2xl"
              href="mailto:vidchill@vidchill.com"
            >
              Contact
            </Button>
          </div>
          <dl className="mx-auto mt-10 max-w-3xl  space-y-6 divide-y divide-primary">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left ">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="C text-base leading-7">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </Layout>
    </>
  );
};

export default Help;
