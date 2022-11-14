import styles from "./ReviewList.module.css";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

const ReviewList = (props) => {
  return (
    <>
      <main className={styles.container}>
        <header>
          <div className="text-center mt-5">
            <img src="./truck-fast-solid.svg" alt="Pizza Truck Logo" />
          </div>
          <h1><a href="./pizza-builder">Pizza Pirates</a></h1>
          <p className="mb-4">Fresh Mediterranean Pizza</p>
        </header>
        <h6>All Reviews:</h6>
        <div className={styles.scroll}>
          {props.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
        <p className="mt-5">Powered by Food Runner, Inc. ©</p>
      </main>
    </>
  );
};

export default ReviewList;
