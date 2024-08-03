import { Knex } from 'knex';

const TABLE_NAME = 'books';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          "title": "Good Omens",
          "isbn": "978-0060853983",
          "published_date": "1990-05-10",
          "total_copies": 3,
          "available_copies": 0,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722272812/images/good_omens.jpg.jpg",
          "created_by": 1,
        },
        {
          "title": "The Fault in Our Stars",
          "isbn": "978-0525478812",
          "published_date": "2012-01-10",
          "total_copies": 5,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/fault_in_our_stars_qxhhia.jpg",
          "created_by": 1,
        },
        {
          "title": "To Kill a Mockingbird",
          "isbn": "978-0061120084",
          "published_date": "1960-07-11",
          "total_copies": 4,
          "available_copies": 3,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325624/to_kill_a_mocking_bird_kfwukc.jpg",
          "created_by": 1,
        },
        {
          "title": "1984",
          "isbn": "978-0451524935",
          "published_date": "1949-06-08",
          "total_copies": 6,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325615/1984_qfgoxs.jpg",
          "created_by": 1,
        },
        {
          "title": "Pride and Prejudice",
          "isbn": "978-1503290563",
          "published_date": "1813-01-28",
          "total_copies": 3,
          "available_copies": 3,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/pride_and_prejudice_xagvkg.jpg",
          "created_by": 1,
        },
        {
          "title": "The Great Gatsby",
          "isbn": "978-0743273565",
          "published_date": "1925-04-10",
          "total_copies": 4,
          "available_copies": 3,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325620/the_great_gatsby_mnmpw3.jpg",
          "created_by": 1,
        },
        {
          "title": "The Hobbit",
          "isbn": "978-0547928227",
          "published_date": "1937-09-21",
          "total_copies": 5,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325620/the_hobbit_gpf8gc.jpg",
          "created_by": 1,
        },
        {
          "title": "Harry Potter and the Sorcerers Stone",
          "isbn": "978-0439708180",
          "published_date": "1997-06-26",
          "total_copies": 10,
          "available_copies": 9,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/harry_potter_1_v2veni.jpg",
          "created_by": 1,
        },
        {
          "title": "The Catcher in the Rye",
          "isbn": "978-0316769488",
          "published_date": "1951-07-16",
          "total_copies": 4,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325618/the_catcher_in_the_rye_gbq4zj.jpg",
          "created_by": 1,
        },
        {
          "title": "Moby Dick",
          "isbn": "978-1503280786",
          "published_date": "1851-10-18",
          "total_copies": 3,
          "available_copies": 2,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/moby_dick_tu7qwo.jpg",
          "created_by": 1,
        },
        {
          "title": "Brave New World",
          "isbn": "978-0060850524",
          "published_date": "1932-01-01",
          "total_copies": 4,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/brave_new_world_drivms.jpg",
          "created_by": 1,
        },
        {
          "title": "The Shining",
          "isbn": "978-0307743657",
          "published_date": "1977-01-28",
          "total_copies": 5,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325621/the_shining_v8hoiy.jpg",
          "created_by": 1,
        },
        {
          "title": "The Hunger Games",
          "isbn": "978-0439023481",
          "published_date": "2008-09-14",
          "total_copies": 7,
          "available_copies": 6,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325620/the_hunger_games_pmbjdw.jpg",
          "created_by": 1,
        },
        {
          "title": "The Road",
          "isbn": "978-0307387899",
          "published_date": "2006-09-26",
          "total_copies": 4,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325621/the_road_mojb9x.jpg",
          "created_by": 1,
        },
        {
          "title": "A Game of Thrones",
          "isbn": "978-0553593716",
          "published_date": "1996-08-06",
          "total_copies": 6,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/a_game_of_thrones_bmd27a.jpg",
          "created_by": 1,
        },
        {
          "title": "The Book Thief",
          "isbn": "978-0375842207",
          "published_date": "2005-03-14",
          "total_copies": 5,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325617/the_book_thief_srr6ur.jpg",
          "created_by": 1,
        },
        {
          "title": "The Girl with the Dragon Tattoo",
          "isbn": "978-0307949486",
          "published_date": "2005-08-27",
          "total_copies": 5,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325617/the_girl_with_the_dragon_tattoo_lxhrjo.jpg",
          "created_by": 1,
        },
        {
          "title": "The Hitchhikers Guide to the Galaxy",
          "isbn": "978-0345391803",
          "published_date": "1979-10-12",
          "total_copies": 4,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325621/the_hitchhiker_s_guide_to_the_galaxy_jtk7ql.jpg",
          "created_by": 1,
        },
        {
          "title": "Life of Pi",
          "isbn": "978-0156027328",
          "published_date": "2001-09-11",
          "total_copies": 5,
          "available_copies": 5,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325615/life_of_pi_t6orq6.jpg",
          "created_by": 1,
        },
        {
          "title": "Slaughterhouse-Five",
          "isbn": "978-0385333849",
          "published_date": "1969-03-31",
          "total_copies": 4,
          "available_copies": 4,
          "image_link": "https://res.cloudinary.com/dpkvoohfd/image/upload/v1722325616/slaughterhouse_five_n2hkjd.jpg",
          "created_by": 1,
        }
      ]);
    });
}