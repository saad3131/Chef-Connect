import {
  createApp,
  nextTick,
} from "https://unpkg.com/petite-vue?module";
// import { transitionDirective } from "https://unpkg.com/vue-petite-transition?module";

function FieldComponent(props) {
  return {
    $template: "#field-component-template",
    field: props.field,
    fieldNum: props.currentStep + props.index + 1,

    get isInvalid() {
      return props.isInvalid();
    },
    get invalidMessage() {
      return props.invalidMessage();
    },
    get nextStep() {
      nextTick(() => {
        this.$refs.InputFields?.focus();
        // this.focusElem(this.$refs.InputFields);
        //this.$refs.InputFields.setAttribute("autofocus", "true");
        // this.invalids = {};
      });
    },
    // methods
    validate() {
      nextTick(() => {
        if (this.isInvalid) {
          props.validate();
        }
      });
    },
  };
}

function StepsIndicatorComponent(props) {
  return {
    $template: "#step-indicator-component-template",
    stepsCount: props.stepsCount,
    get stepsCountWithSuccessPage() {
      return this.stepsCount + 1;
    },
  };
}

createApp({
  // Components
  StepsIndicatorComponent,
  FieldComponent,

  // Data
  formstarted: false,
  currentStep: 0,
  submitted: false,
  submitSuccess: false,
  submitError: false,
  formAccessKey: "f5d87d7a-a8fe-4ff3-8fed-26e3dd636d26",
  invalids: {},
  fields: {
    name: {
      label: "What's your full name?",
      helptext: "Let's get acquainted. ",
      value: "",
      validations: [
        {
          message: "Name is a required field",
          test: (value) => value,
        },
      ],
    },
    address: {
      label: "where do you live?",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "Dubai",
        "Sharjah",
        "Abu-Dhabi",
        "Ajman",
        "Ras Al Khaimah",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },

    duration: {
      label: "We're looking for a Private Chef for...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "One Time",
        "Monthly",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    guestnumber: {
      label: "We Are...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "2 Person",
        "3 person",
        "4 person",
        "I am alone",
        "Party",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    timing: {
      label: "It's for...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "Lunch",
        "Dinner",
        "Both",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    cuisine: {
      label: "Our preferred cuisine is...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "Local",                
        "Indian",
        "French",
        "Italian",
        "Surprise Me",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    burner: {
      label: "Our kitchen is...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "1 burner",                
        "2 buener",
        "3 burner",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    live: {
      label: "Do you want Live cooking Lesson...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "YES",                
        "NO",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    date: {
      label: "Date ie:01/01/0101",
      value: "",
      validations: [
        {
          message: "Date is a required field",
          test: (value) => value,
        },
        {
          message: "00/00/0000",
          test: (value) => Date(value),
        },
      ],
    },
    mealtype: {
      label: "We Are Looking For...",
      value: "",
      type: "select",
      name: "referral",
      options: [
        "Basic",                
        "Indulge",
        "Exclusive",
      ],
      optional: false,
      validations: [
        {
          message: "Please select an option",
          test: (value) => value,
        },
      ],
    },
    message: {
      label: "Anything You Would Like The Chef To Know",
      value: "",
      validations: [
      ],
    },
    mobilenumber: {
      label: "Phone No.",
      value: "",
      validations: [
        {
          message: "Number is a required field",
          test: (value) => value,
        },
        {
          message: "Phone Number must be 10 digits",
          test: (value) => !isNaN(value) && value.length === 10,
        },
      ],
    },
    email: {
      label: "Email",
      helptext: "Further details will be emailed to you ",
      value: "",
      validations: [
        {
          message: "Must be a valid email address",
          test: (value) => validateEmail(value),
        },
        {
          message: "Email is required",
          test: (value) => value,
        },
      ],
    },


  },
  steps: [
    ["name"],
    ["address"],
    ["duration"],
    ["guestnumber"],
    ["timing"],
    ["cuisine"],
    ["burner"],
    ["mealtype"],
    ["live"],
    ["date"],
    ["message"],
    ["mobilenumber"],
    ["email"],
  
  ],

  // Getters
  get currentFields() {
    return this.steps[this.currentStep];
  },
  get totalSteps() {
    return this.steps.length;
  },
  get isFirstStep() {
    return this.currentStep === 0;
  },
  get isLastStep() {
    return this.currentStep === this.totalSteps - 1;
  },

  startForm() {
    return (this.formstarted = true);
  },

  // Methods
  previousStep() {
    if (this.isFirstStep) return;
    // removes all invalids so doesn't show error messages on back
    this.invalids = {};
    this.currentStep--;
  },
  nextStep() {
    if (this.isLastStep) return;
    this.validate();
    //console.log(this);
    if (this.isInvalid) return;
    this.currentStep++;
  },
  get isInvalid() {
    return !!Object.values(this.invalids).filter((key) => key).length;
  },

  // methods
  validate() {
    this.invalids = {};
    // validates all the fields on the current page
    this.currentFields.forEach((key) => {
      this.validateField(key);
    });
  },
  validateField(fieldKey) {
    this.invalids[fieldKey] = false;
    const field = this.fields[fieldKey];
    // run through each of the fields validation tests
    field.validations.forEach((validation) => {
      if (!validation.test(field.value)) {
        this.invalids[fieldKey] = validation.message;
      }
    });
  },
  listenEnterKey() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        if (!this.formstarted) {
          this.formstarted = true;
        } else if (!this.isLastStep && !this.isInvalid) {
          return this.nextStep();
        } else {
          return this.submit();
        }
      }
    });
  },
  async submit() {
    // if form not valid don't submit
    this.validate();
    if (this.isInvalid) return;
    this.submitted = true;
    const formData = this.fields;
    const object = {
      access_key: this.formAccessKey,
      subject: "New submission from multistep form",
    };
    for (const key in formData) {
      object[key] = formData[key].value;
    }
    console.log("Submitting form..", object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(object),
    });
    const result = await response.json();

    if (result.success) {
      console.log(result);
      // submit on valid form
      this.submitSuccess = true;
    } else {
      console.log(result);
      this.submitError = true;
    }

    // this will also work.
    // for (let [key, value] of Object.entries(formData)) {
    //   console.log(key, value.value);
    // }
  },
})
  // .directive("transition", transitionDirective)
  .mount("#multistep-form");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
