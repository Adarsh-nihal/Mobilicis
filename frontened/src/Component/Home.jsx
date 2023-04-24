import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Box,
  Spinner,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      axios
        .get(`https://tough-fox-houndstooth.cyclic.app/User/filter?q=${query}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((er) => console.log(er));
    } else {
      axios
        .get(`https://tough-fox-houndstooth.cyclic.app/User`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((er) => console.log(er));
    }
  }, [query]);

  return (
    <Box mt="2rem">
      <Select
        placeholder="Select for filter"
        w="50%"
        margin="auto"
        onChange={(e) => setQuery(e.target.value)}
      >
        <option value="A">
          Income less than $5 USD & car of brand "BMW” ||“Mercedes”.
        </option>
        <option value="B">
          Male Users which have phone price greater than 10,000.
        </option>
        <option value="C">
          Users whose last name starts with “M” and has a quote character length
          greater than 15 and email includes his/her last name.
        </option>
        <option value="D">
          Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose
          email does not include any digit.
        </option>
        {/* <option value="E">
          Show the data of top 10 cities which have the highest number of users
          and their average income.
        </option> */}
      </Select>
      <Heading mt="1.5rem" fontFamily="serif">
        {" "}
        Users Details{" "}
      </Heading>
      <Table mt="1.5rem" size="sm" fontFamily="serif">
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>first_name</Th>
            <Th>last_name</Th>
            <Th>email</Th>
            <Th>gender</Th>
            <Th>income</Th>
            <Th>city</Th>
            <Th>car</Th>
            <Th>quote</Th>
            <Th>phone_price</Th>
          </Tr>
        </Thead>
        {data.length == 0 && (
          <Flex justifyContent={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              mt="60%"
            />
          </Flex>
        )}
        <Tbody>
          {data.length > 0 &&
            data.map((data) => (
              <Tr>
                <Td fontWeight="900">{data.id}</Td>
                <Td>{data.first_name}</Td>
                <Td> {data.last_name}</Td>
                <Td>{data.email}</Td>
                <Td>{data.gender}</Td>
                <Td fontWeight="700" color="green">
                  {data.income}
                </Td>
                <Td>{data.city}</Td>
                <Td>{data.car}</Td>
                <Td>{data.quote}</Td>
                <Td fontWeight="700">{data.phone_price} Rs</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Home;
